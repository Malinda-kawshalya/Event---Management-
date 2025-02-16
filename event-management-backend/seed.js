const mongoose = require("mongoose");
require("dotenv").config();
const ChatMessage = require("./Model/chatModel");

// Use the environment variable OR fallback to a hardcoded URI (Not recommended for production)
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://mkk2001:mkk2001@eventz.ai6bj.mongodb.net/event-management?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB Connection Error:", err);
  process.exit(1);
});

const messages = [
  { userMessage: "Hello", botResponse: "Hi there! How can I help you?" },
  { userMessage: "Event details", botResponse: "You can find event details on our website." },
  { userMessage: "How to book?", botResponse: "Click on an event and select 'Book Now'." }
];

async function seedDB() {
  try {
    await ChatMessage.deleteMany({});
    await ChatMessage.insertMany(messages);
    console.log("Database Seeded Successfully!");
  } catch (error) {
    console.error("Seeding Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
