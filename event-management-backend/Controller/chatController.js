const ChatMessage = require("../Model/chatModel");

// Handle user message and return bot response
exports.getChatResponse = async (req, res) => {
  try {
    const { userMessage } = req.body;

    // Find a matching response in the database
    const response = await ChatMessage.findOne({ userMessage });

    if (response) {
      return res.json({ botResponse: response.botResponse });
    } else {
      return res.json({ botResponse: "I'm not sure how to respond to that." });
    }
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add new predefined chat messages (Admin use)
exports.addChatMessage = async (req, res) => {
  try {
    const { userMessage, botResponse } = req.body;

    if (!userMessage || !botResponse) {
      return res.status(400).json({ error: "Both userMessage and botResponse are required." });
    }

    const newMessage = new ChatMessage({ userMessage, botResponse });
    await newMessage.save();

    return res.json({ message: "Chat message added successfully!" });
  } catch (error) {
    console.error("Error adding chat message:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all predefined chat messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find();
    return res.json(messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
