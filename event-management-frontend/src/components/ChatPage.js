// components/Chat.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";

const Chat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Predefined message options
  const predefinedOptions = [
    "Hello",
    "What is the event about?",
    "How do I register?",
    "What is the event location?",
    "Thank you",
  ];

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`/api/chat/history/${userId}`);
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchChatHistory();
  }, [userId]);

  // Handle sending a message
  const handleSendMessage = async (message) => {
    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message }),
      });
      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h3>Chat</h3>
          <ListGroup>
            {messages.map((msg, index) => (
              <ListGroup.Item key={index} className={msg.sender === "user" ? "text-end" : "text-start"}>
                <strong>{msg.sender === "user" ? "You" : "System"}:</strong> {msg.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
              setInput("");
            }}
          >
            <Form.Control
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="mt-3"
            />
            <Button type="submit" className="mt-2">
              Send
            </Button>
          </Form>
          <div className="mt-3">
            <h5>Predefined Messages</h5>
            {predefinedOptions.map((option, index) => (
              <Button key={index} variant="outline-primary" className="me-2 mb-2" onClick={() => handleSendMessage(option)}>
                {option}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;