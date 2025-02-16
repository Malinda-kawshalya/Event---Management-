const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
  userMessage: String,
  botResponse: String,
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);
