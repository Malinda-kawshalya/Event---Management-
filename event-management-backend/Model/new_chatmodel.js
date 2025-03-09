// Model/chatModel.js
const mongoose = require('mongoose');

// Chat message schema
const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for guests
  },
  message: {
    type: String,
    required: true
  },
  isBot: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: String,
    required: true
  }
});

// Chat session schema
const chatSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for guests
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  context: {
    type: Object,
    default: {}
  }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
const ChatSession = mongoose.model('ChatSession', chatSessionSchema);

module.exports = { ChatMessage, ChatSession };