// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../Controller/chatController");

// Handle user messages
router.post("/message", chatController.handleMessage);

// Get chat history for a user
router.get("/history/:userId", chatController.getChatHistory);

module.exports = router;