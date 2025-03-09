// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../Controller/new_chatcontroller');

// Initialize a new chat session
router.post('/session', chatController.initSession);

// Send a message and get a response
router.post('/message', chatController.sendMessage);

// Get chat history for a session
router.get('/history/:sessionId', chatController.getChatHistory);

// End a chat session
router.put('/end/:sessionId', chatController.endSession);

module.exports = router;