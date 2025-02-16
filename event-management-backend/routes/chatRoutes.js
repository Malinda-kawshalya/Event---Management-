const express = require("express");
const { getChatResponse, addChatMessage, getAllMessages } = require("../Controller/chatController");

const router = express.Router();

// Route to get chatbot response
router.post("/response", getChatResponse);

// Route to add predefined messages
router.post("/messages", addChatMessage);

// Route to get all predefined messages
router.get("/messages", getAllMessages);

module.exports = router;
