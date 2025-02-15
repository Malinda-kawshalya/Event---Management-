// controllers/chatController.js
const Chat = require("../Model/chatModel");

// Predefined questions and answers
const predefinedMessages = {
  "Hello": "Hi there! How can I help you today?",
  "What is the event about?": "The event is about [Event Details]. Would you like to know more?",
  "How do I register?": "You can register by clicking the 'RSVP' button on the event page.",
  "What is the event location?": "The event will be held at [Event Location].",
  "Thank you": "You're welcome! Let us know if you need further assistance.",
};

// Handle user messages
const handleMessage = async (req, res) => {
  const { userId, message } = req.body;

  try {
    // Find or create a chat session for the user
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = new Chat({ userId, messages: [] });
    }

    // Add the user's message to the chat
    chat.messages.push({ sender: "user", text: message });

    // Get the predefined response (if available)
    const response = predefinedMessages[message] || "Sorry, I didn't understand that. Can you please clarify?";

    // Add the system's response to the chat
    chat.messages.push({ sender: "system", text: response });

    // Save the chat to the database
    await chat.save();

    // Return the updated chat
    res.status(200).json(chat);
  } catch (err) {
    console.error("Error handling message:", err);
    res.status(500).json({ message: "Failed to process message" });
  }
};

// Get chat history for a user
const getChatHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const chat = await Chat.findOne({ userId });
    if (!chat) {
      return res.status(404).json({ message: "No chat history found" });
    }
    res.status(200).json(chat);
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ message: "Failed to fetch chat history" });
  }
};

module.exports = { handleMessage, getChatHistory };