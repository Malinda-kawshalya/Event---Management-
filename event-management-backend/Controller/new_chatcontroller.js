// Controller/chatController.js
const { ChatMessage, ChatSession } = require('../Model/new_chatmodel');
const { v4: uuidv4 } = require('uuid');

// Event-related responses database
// In production, this could come from your database
const eventFAQs = {
  'event types': [
    'We can help with corporate events, weddings, birthday parties, conferences, and more!',
    'What type of event are you planning?'
  ],
  'pricing': [
    'Our pricing varies based on event type, size, and requirements.',
    'For a detailed quote, please provide more details about your event.'
  ],
  'booking': [
    'To book an event, we require a 25% deposit and a signed contract.',
    'Would you like me to explain the booking process in more detail?'
  ],
  'cancellation': [
    'Our cancellation policy allows for full refunds up to 30 days before the event.',
    'Partial refunds are available for cancellations 15-30 days prior to the event.'
  ],
  'location': [
    'We organize events in various venues across the city.',
    'Do you have a specific venue in mind or would you like some recommendations?'
  ]
};

// Process the user message and generate a response
function processChatMessage(message, context = {}) {
  message = message.toLowerCase();
  
  // Check for greetings
  if (message.match(/\b(hi|hello|hey|greetings)\b/)) {
    return "Hello! I'm your event management assistant. How can I help you with your event today?";
  }
  
  // Check for thank you
  if (message.match(/\b(thanks|thank you|thank)\b/)) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  
  // Check for goodbye
  if (message.match(/\b(bye|goodbye|see you|later)\b/)) {
    return "Thank you for chatting with us! Feel free to return if you have more questions about your event.";
  }
  
  // Check for event-related keywords
  for (const [topic, responses] of Object.entries(eventFAQs)) {
    if (message.includes(topic)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Check for questions about dates
  if (message.match(/\b(date|when|time|schedule)\b/)) {
    return "We're flexible with dates! Could you please specify your preferred date and time for the event?";
  }
  
  // Check for questions about services
  if (message.match(/\b(service|offer|provide|help with)\b/)) {
    return "We offer complete event management services including venue selection, catering, decorations, entertainment, and logistics management. What specific services are you interested in?";
  }
  
  // Contact request
  if (message.match(/\b(contact|call|email|phone|speak|representative)\b/)) {
    return "I'd be happy to connect you with one of our event specialists. Please provide your contact details, and we'll reach out to you within 24 hours.";
  }
  
  // Fallback response
  return "I'm not sure I understand. Could you please rephrase your question about event management? Or you can ask about our services, pricing, venues, or booking process.";
}

// Initialize or retrieve a chat session
exports.initSession = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Create a new session
    const sessionId = uuidv4();
    const session = new ChatSession({
      sessionId,
      userId: userId || null
    });
    
    await session.save();
    
    // Add welcome message
    const welcomeMessage = new ChatMessage({
      sessionId,
      userId: userId || null,
      message: "Hi there! I'm your event management assistant. How can I help you today?",
      isBot: true
    });
    
    await welcomeMessage.save();
    
    res.status(200).json({
      success: true,
      sessionId,
      message: welcomeMessage
    });
  } catch (error) {
    console.error('Error initializing chat session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize chat session',
      error: error.message
    });
  }
};

// Process message and generate response
exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, userId, message } = req.body;
    
    if (!sessionId || !message) {
      return res.status(400).json({
        success: false,
        message: 'SessionId and message are required'
      });
    }
    
    // Find or update session
    const session = await ChatSession.findOne({ sessionId });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }
    
    // Update session last activity
    session.lastActivity = Date.now();
    await session.save();
    
    // Save user message
    const userMessage = new ChatMessage({
      sessionId,
      userId: userId || null,
      message,
      isBot: false
    });
    
    await userMessage.save();
    
    // Process message and generate bot response
    const botResponse = processChatMessage(message, session.context);
    
    // Save bot response
    const botMessage = new ChatMessage({
      sessionId,
      userId: userId || null,
      message: botResponse,
      isBot: true
    });
    
    await botMessage.save();
    
    res.status(200).json({
      success: true,
      response: botMessage
    });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process message',
      error: error.message
    });
  }
};

// Get chat history for a session
exports.getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'SessionId is required'
      });
    }
    
    // Find chat session
    const session = await ChatSession.findOne({ sessionId });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }
    
    // Get all messages for the session
    const messages = await ChatMessage.find({ sessionId }).sort('timestamp');
    
    res.status(200).json({
      success: true,
      session,
      messages
    });
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve chat history',
      error: error.message
    });
  }
};

// End a chat session
exports.endSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'SessionId is required'
      });
    }
    
    // Find and update session
    const session = await ChatSession.findOne({ sessionId });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }
    
    session.isActive = false;
    await session.save();
    
    res.status(200).json({
      success: true,
      message: 'Chat session ended successfully'
    });
  } catch (error) {
    console.error('Error ending chat session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to end chat session',
      error: error.message
    });
  }
};