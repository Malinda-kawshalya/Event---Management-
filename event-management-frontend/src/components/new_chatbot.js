import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/new_chatbot.css'; 

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your event assistant. How can I help you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageToRasa = async (message) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook", 
        {
          sender: "user",
          message: message
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"  // Allow CORS
          }
        }
      );

      // Add bot responses to chat
      const botMessages = response.data.map(msg => ({
        text: msg.text,
        isBot: true
      }));

      setMessages(prevMessages => [...prevMessages, ...botMessages]);
    } catch (error) {
      console.error("Error sending message to Rasa:", error);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    setMessages([...messages, { text: inputMessage, isBot: false }]);

    // Send message to Rasa
    sendMessageToRasa(inputMessage);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Icon Button (Floating) */}
      {!isOpen && (
        <div className="chat-icon" onClick={() => setIsOpen(true)}>
          <i className="fas fa-comments"></i>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h5>Event Support</h5>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="messages-container">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="input-container">
            <input
              type="text"
              className="message-input"
              placeholder="Ask something..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="send-btn" onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
