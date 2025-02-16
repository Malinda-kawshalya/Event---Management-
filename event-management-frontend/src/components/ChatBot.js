import React, { useState } from "react";
import axios from "axios";
import "../css/Chatbot.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! How can I help?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);

    try {
      const response = await axios.post("http://localhost:5000/api/chat/response", { userMessage: input });
      setMessages((prev) => [...prev, { text: response.data.botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <button className="btn btn-primary chat-icon" onClick={toggleChat}>
        💬
      </button>
      {isOpen && (
        <div className="chat-window shadow">
          <div className="chat-header bg-primary text-white d-flex justify-content-between p-2">
            <span>Chat</span>
            <button className="btn btn-danger btn-sm" onClick={toggleChat}>✖</button>
          </div>
          <div className="chat-messages p-2">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender} p-2 mb-1 rounded`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input d-flex p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary ms-2" onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
