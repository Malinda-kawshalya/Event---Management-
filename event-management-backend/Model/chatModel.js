// models/Chat.js
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (if you have one)
  },
  messages: [
    {
      sender: { type: String, enum: ["user", "system"], required: true }, // Who sent the message
      text: { type: String, required: true }, // The message content
      timestamp: { type: Date, default: Date.now }, // When the message was sent
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;