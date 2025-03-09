import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/new_chatbot.css'; 
import axios from 'axios';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [userId, setUserId] = useState(null); // Optional, set this if you have user authentication
    const messagesEndRef = useRef(null);

    // Auto-scroll to the bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initialize chat session when chatbot is opened
    useEffect(() => {
        if (isOpen && !sessionId) {
            initChatSession();
        }
    }, [isOpen]);

    const initChatSession = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:5000/api/chatbot/session', { 
                userId: userId 
            });
            
            if (response.data.success) {
                setSessionId(response.data.sessionId);
                // Add welcome message
                setMessages([{
                    text: response.data.message.message,
                    isBot: true
                }]);
            }
        } catch (error) {
            console.error('Error initializing chat session:', error);
            setMessages([{
                text: "Sorry, couldn't initialize chat. Please try again later.",
                isBot: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '' || !sessionId) return;
        
        // Add user message to chat
        setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
        setIsLoading(true);
        
        try {
            // Make API call to send message
            const response = await axios.post('http://localhost:5000/api/chatbot/message', { 
                sessionId,
                userId,
                message: inputMessage 
            });
            
            if (response.data.success) {
                // Add bot response from backend
                setMessages(prev => [
                    ...prev, 
                    { 
                        text: response.data.response.message, 
                        isBot: true 
                    }
                ]);
            } else {
                throw new Error('Failed to get response');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [
                ...prev, 
                { 
                    text: "Sorry, there was an error processing your request.", 
                    isBot: true 
                }
            ]);
        } finally {
            setIsLoading(false);
            setInputMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleClose = async () => {
        // End the session when closing the chat
        if (sessionId) {
            try {
                await axios.put(`/api/chatbot/end/${sessionId}`);
            } catch (error) {
                console.error('Error ending chat session:', error);
            }
        }
        
        // Reset state
        setIsOpen(false);
        setSessionId(null);
        setMessages([]);
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
                        <button className="close-btn" onClick={handleClose}>
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
                        {isLoading && (
                            <div className="message bot-message">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="input-container">
                        <input
                            type="text"
                            className="message-input"
                            placeholder="Ask something..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading || !sessionId}
                        />
                        <button 
                            className="send-btn" 
                            onClick={handleSendMessage}
                            disabled={isLoading || !sessionId}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;