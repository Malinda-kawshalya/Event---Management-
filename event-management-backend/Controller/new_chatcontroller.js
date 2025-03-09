// Controller/chatController.js
const { ChatMessage, ChatSession } = require('../Model/new_chatmodel');
const { v4: uuidv4 } = require('uuid');
const Event = require('../Model/eventModel'); // Your existing Event model
const natural = require('natural'); // Natural language processing library
const tokenizer = new natural.WordTokenizer();

// Enhanced event keyword matching with categories and subcategories
const eventTopics = {
  'event types': {
    keywords: ['type', 'kind', 'sorts', 'category', 'event type', 'different events', 'categories'],
    dbQuery: async (messageTokens, originalMessage) => {
      // Fetch available event categories from database
      const categories = await Event.distinct('category');
      return {
        response: `We offer events in these categories: ${categories.join(', ')}. What type of event are you interested in?`,
        data: categories
      };
    }
  },
  'pricing': {
    keywords: ['price', 'cost', 'fee', 'charge', 'rate', 'package', 'budget', 'expensive', 'affordable', 'cheapest', 'premium'],
    dbQuery: async (messageTokens, originalMessage) => {
      // Check if a specific category is mentioned
      const categories = await Event.distinct('category');
      
      // Try to find category in the original message
      let mentionedCategory = null;
      for (const category of categories) {
        if (originalMessage.toLowerCase().includes(category.toLowerCase())) {
          mentionedCategory = category;
          break;
        }
      }
      
      // If no direct match, try tokenized approach
      if (!mentionedCategory) {
        mentionedCategory = findIntersection(messageTokens, categories);
      }
      
      if (mentionedCategory) {
        // Get price range for the category
        const minPrice = await Event.find({ category: mentionedCategory }).sort({ price: 1 }).limit(1);
        const maxPrice = await Event.find({ category: mentionedCategory }).sort({ price: -1 }).limit(1);
        
        if (minPrice.length > 0 && maxPrice.length > 0) {
          return {
            response: `For ${mentionedCategory} events, our prices range from $${minPrice[0].price} to $${maxPrice[0].price}. Would you like details about a specific event?`,
            data: { category: mentionedCategory, minPrice: minPrice[0].price, maxPrice: maxPrice[0].price }
          };
        }
      }
      
      // Get overall price range
      const minPrice = await Event.find().sort({ price: 1 }).limit(1);
      const maxPrice = await Event.find().sort({ price: -1 }).limit(1);
      
      return {
        response: `Our event prices range from $${minPrice[0].price} to $${maxPrice[0].price} depending on the category and features. Which category of events are you interested in?`,
        data: { minPrice: minPrice[0].price, maxPrice: maxPrice[0].price }
      };
    }
  },
  'events': {
    keywords: ['show', 'list', 'available', 'upcoming', 'events', 'schedule', 'calendar'],
    dbQuery: async (messageTokens, originalMessage) => {
      // Check if a specific category is mentioned
      const categories = await Event.distinct('category');
      
      // Try to find category in the original message
      let mentionedCategory = null;
      for (const category of categories) {
        if (originalMessage.toLowerCase().includes(category.toLowerCase())) {
          mentionedCategory = category;
          break;
        }
      }
      
      // If no direct match, try tokenized approach
      if (!mentionedCategory) {
        mentionedCategory = findIntersection(messageTokens, categories);
      }
      
      const currentDate = new Date();
      let query = { date: { $gte: currentDate } };
      
      if (mentionedCategory) {
        query.category = mentionedCategory;
      }
      
      // Get upcoming events, limit to 5
      const events = await Event.find(query)
        .sort({ date: 1 })
        .limit(5)
        .select('title date time location price');
      
      if (events.length === 0) {
        return {
          response: mentionedCategory 
            ? `I don't see any upcoming events in the ${mentionedCategory} category. Would you like to check other categories?` 
            : `I don't see any upcoming events at the moment. Please check back later or let me know if you're interested in a particular category.`,
          data: []
        };
      }
      
      // Format event list response
      const eventList = events.map(e => {
        const eventDate = new Date(e.date).toLocaleDateString();
        return `"${e.title}" on ${eventDate} at ${e.time}, ${e.location}, $${e.price}`;
      }).join('\n• ');
      
      return {
        response: mentionedCategory
          ? `Here are the upcoming ${mentionedCategory} events:\n• ${eventList}\n\nWould you like more details about any of these events?`
          : `Here are our upcoming events:\n• ${eventList}\n\nWould you like more details about any of these events?`,
        data: events
      };
    }
  },
  'location': {
    keywords: ['location', 'venue', 'place', 'where', 'address', 'site', 'facility', 'space', 'held'],
    dbQuery: async (messageTokens, originalMessage) => {
      // Get all unique locations
      const locations = await Event.distinct('location');
      
      // Try direct matching using the original message
      let mentionedLocation = null;
      for (const location of locations) {
        if (originalMessage.toLowerCase().includes(location.toLowerCase())) {
          mentionedLocation = location;
          break;
        }
      }
      
      // If no direct match found, try token intersection
      if (!mentionedLocation) {
        mentionedLocation = findIntersection(messageTokens, locations);
      }
      
      if (mentionedLocation) {
        // Find events at the mentioned location
        const eventsAtLocation = await Event.find({ 
          location: mentionedLocation,
          date: { $gte: new Date() }
        })
        .sort({ date: 1 })
        .limit(3);
        
        if (eventsAtLocation.length > 0) {
          const eventList = eventsAtLocation.map(e => {
            const eventDate = new Date(e.date).toLocaleDateString();
            return `"${e.title}" on ${eventDate} at ${e.time}, $${e.price}`;
          }).join('\n• ');
          
          return {
            response: `Here are the upcoming events at ${mentionedLocation}:\n• ${eventList}\n\nWould you like more information about any of these events?`,
            data: eventsAtLocation
          };
        } else {
          return {
            response: `We have held events at ${mentionedLocation} before, but there are no upcoming events there at the moment. Would you like to know about other locations?`,
            data: { location: mentionedLocation }
          };
        }
      }
      
      // No specific location mentioned
      return {
        response: `We organize events at various locations including ${locations.slice(0, 5).join(', ')} and more. Is there a specific location you're interested in?`,
        data: locations
      };
    }
  },
  'event details': {
    keywords: ['details', 'information', 'more info', 'tell me about', 'specific event', 'description'],
    dbQuery: async (messageTokens, originalMessage) => {
      // Find if any event title is mentioned
      const eventTitles = await Event.distinct('title');
      
      // Try direct matching first
      let mentionedEvent = null;
      for (const title of eventTitles) {
        if (originalMessage.toLowerCase().includes(title.toLowerCase())) {
          mentionedEvent = title;
          break;
        }
      }
      
      if (mentionedEvent) {
        // Find the event with case-insensitive search
        const event = await Event.findOne({
          title: new RegExp(mentionedEvent, 'i')
        }).populate('organizer', 'name');
        
        if (event) {
          const eventDate = new Date(event.date).toLocaleDateString();
          return {
            response: `Here are the details for "${event.title}":\n
• Date: ${eventDate}
• Time: ${event.time}
• Location: ${event.location}
• Price: $${event.price}
• Category: ${event.category}
• Organizer: ${event.organizer.name}
• Description: ${event.description}
• Available Seats: ${event.maxAttendees}

Would you like to know about other events?`,
            data: event
          };
        }
      }
      
      return {
        response: `I'd be happy to provide details about a specific event. Could you tell me which event you're interested in?`,
        data: null
      };
    }
  },
  'availability': {
    keywords: ['available', 'seats', 'tickets', 'space', 'full', 'sold out', 'capacity', 'attendees'],
    dbQuery: async (messageTokens, originalMessage) => {
      const eventTitles = await Event.distinct('title');
      
      // Try direct matching first
      let mentionedEvent = null;
      for (const title of eventTitles) {
        if (originalMessage.toLowerCase().includes(title.toLowerCase())) {
          mentionedEvent = title;
          break;
        }
      }
      
      if (mentionedEvent) {
        const event = await Event.findOne({
          title: new RegExp(mentionedEvent, 'i')
        });
        
        if (event) {
          // You would need to integrate with a booking system to get actual available seats
          // This is a placeholder assuming you'll implement that logic
          const availableSeats = event.maxAttendees; // In a real system, you'd subtract booked seats
          
          return {
            response: `For "${event.title}", we currently have ${availableSeats} seats available out of a maximum capacity of ${event.maxAttendees}. Would you like information about booking?`,
            data: { event, availableSeats }
          };
        }
      }
      
      // No specific event mentioned
      return {
        response: `I can check seat availability for any of our events. Could you specify which event you're interested in?`,
        data: null
      };
    }
  },
  'date': {
    keywords: ['when', 'date', 'day', 'month', 'time', 'schedule', 'upcoming', 'next', 'soon'],
    dbQuery: async (messageTokens, originalMessage) => {
      // Check for month names
      const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      
      // Try to find month in the original message
      let mentionedMonth = null;
      for (const month of months) {
        if (originalMessage.toLowerCase().includes(month)) {
          mentionedMonth = month;
          break;
        }
      }
      
      // If no direct match, try tokenized approach
      if (!mentionedMonth) {
        mentionedMonth = findIntersection(messageTokens, months);
      }
      
      if (mentionedMonth) {
        const monthIndex = months.indexOf(mentionedMonth);
        const currentYear = new Date().getFullYear();
        
        // Create date range for the mentioned month
        const startDate = new Date(currentYear, monthIndex, 1);
        const endDate = new Date(currentYear, monthIndex + 1, 0);
        
        const events = await Event.find({
          date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });
        
        if (events.length > 0) {
          const eventList = events.map(e => {
            const day = new Date(e.date).getDate();
            return `"${e.title}" on ${mentionedMonth.charAt(0).toUpperCase() + mentionedMonth.slice(1)} ${day}, at ${e.time}, ${e.location}`;
          }).join('\n• ');
          
          return {
            response: `Here are the events in ${mentionedMonth.charAt(0).toUpperCase() + mentionedMonth.slice(1)}:\n• ${eventList}\n\nWould you like details about any of these events?`,
            data: events
          };
        } else {
          return {
            response: `We don't have any events scheduled in ${mentionedMonth.charAt(0).toUpperCase() + mentionedMonth.slice(1)} at the moment. Would you like to check events in another month?`,
            data: []
          };
        }
      }
      
      // No specific month mentioned, return upcoming events
      const currentDate = new Date();
      const events = await Event.find({
        date: { $gte: currentDate }
      })
      .sort({ date: 1 })
      .limit(5);
      
      if (events.length > 0) {
        const eventList = events.map(e => {
          const eventDate = new Date(e.date).toLocaleDateString();
          return `"${e.title}" on ${eventDate}, at ${e.time}`;
        }).join('\n• ');
        
        return {
          response: `Here are our upcoming events:\n• ${eventList}\n\nWould you like details about any of these events?`,
          data: events
        };
      } else {
        return {
          response: `We don't have any upcoming events scheduled at the moment. Please check back later or let me know if you'd like to be notified when new events are added.`,
          data: []
        };
      }
    }
  }
};

// Helper function to find intersection between arrays
function findIntersection(arr1, arr2) {
  const set = new Set(arr2.map(item => item.toLowerCase()));
  for (const item of arr1) {
    if (set.has(item.toLowerCase())) {
      return item.toLowerCase();
    }
  }
  return null;
}

// Enhanced message processing function with NLP and context
async function processChatMessage(message, sessionContext = {}) {
  const originalMessage = message;
  message = message.toLowerCase();
  const tokens = tokenizer.tokenize(message);
  
  // Check for greetings
  if (message.match(/\b(hi|hello|hey|greetings)\b/)) {
    return {
      text: "Hello! I'm your event assistant. I can help you find events, check prices, view locations, and more. What type of events are you interested in?",
      context: { greeted: true }
    };
  }
  
  // Check for thank you
  if (message.match(/\b(thanks|thank you|thank)\b/)) {
    return {
      text: "You're welcome! Is there anything else you'd like to know about our events?",
      context: sessionContext
    };
  }
  
  // Check for goodbye
  if (message.match(/\b(bye|goodbye|see you|later)\b/)) {
    return {
      text: "Thank you for chatting with us! We hope to see you at one of our events soon. Have a great day!",
      context: { ...sessionContext, ended: true }
    };
  }
  
  // Check for contact request
  if (message.match(/\b(contact|call|email|phone|speak|representative|organizer)\b/)) {
    // If we have a specific event in context, provide organizer info
    if (sessionContext.currentEvent) {
      return {
        text: `For "${sessionContext.currentEvent.title}", please contact the organizer at [ORGANIZER_EMAIL]. Alternatively, you can provide your contact information, and we'll have the organizer reach out to you.`,
        context: { ...sessionContext, requestedContact: true }
      };
    }
    
    return {
      text: "I'd be happy to connect you with our event team. Please provide your preferred contact method (phone/email), and someone will reach out to you within 24 hours.",
      context: { ...sessionContext, requestedContact: true }
    };
  }
  
  // If contact information is provided after requesting contact
  if (sessionContext.requestedContact && 
      (message.includes('@') || message.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/))) {
    return {
      text: "Thank you for providing your contact information. Our team will contact you within 24 hours. Is there anything specific about our events that you'd like them to address?",
      context: { ...sessionContext, contactInfoProvided: true, contactInfo: originalMessage }
    };
  }
  
  // Check for specific event mentions
  try {
    const eventTitles = await Event.distinct('title');
    
    for (const title of eventTitles) {
      if (message.includes(title.toLowerCase())) {
        const event = await Event.findOne({ title: title }).populate('organizer', 'name');
        
        if (event) {
          const eventDate = new Date(event.date).toLocaleDateString();
          return {
            text: `Here are the details for "${event.title}":\n
• Date: ${eventDate}
• Time: ${event.time}
• Location: ${event.location}
• Price: $${event.price}
• Category: ${event.category}
• Organizer: ${event.organizer.name}
• Description: ${event.description}\n
Would you like to know about similar events or check availability?`,
            context: { ...sessionContext, currentEvent: event, lastTopic: 'event details' }
          };
        }
      }
    }
  } catch (error) {
    console.error('Error checking for event mentions:', error);
  }
  
  // Check for event-related topics using enhanced matching
  for (const [topic, info] of Object.entries(eventTopics)) {
    // Check if any keywords match
    if (info.keywords.some(keyword => message.includes(keyword))) {
      try {
        // Get dynamic content from database - pass both tokens and original message
        const result = await info.dbQuery(tokens, originalMessage);
        
        // Update context with the topic and data
        return {
          text: result.response,
          context: { 
            ...sessionContext, 
            lastTopic: topic,
            relevantData: result.data
          }
        };
      } catch (error) {
        console.error(`Error fetching data for topic ${topic}:`, error);
        // Fallback response if database query fails
        return {
          text: `I'd be happy to tell you about our ${topic}. However, I'm having trouble accessing that information right now. Could you try again in a moment?`,
          context: sessionContext
        };
      }
    }
  }
  
  // Check for location mentions even if "location" keyword isn't explicitly used
  try {
    const locations = await Event.distinct('location');
    for (const location of locations) {
      if (originalMessage.toLowerCase().includes(location.toLowerCase())) {
        // Found a location mention, process it like a location query
        const locationHandler = eventTopics['location'];
        const result = await locationHandler.dbQuery(tokens, originalMessage);
        
        return {
          text: result.response,
          context: { 
            ...sessionContext, 
            lastTopic: 'location',
            relevantData: result.data
          }
        };
      }
    }
  } catch (error) {
    console.error('Error checking for location mentions:', error);
  }
  
  // Check for month mentions even if "date" keyword isn't explicitly used
  try {
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    for (const month of months) {
      if (originalMessage.toLowerCase().includes(month)) {
        // Found a month mention, process it like a date query
        const dateHandler = eventTopics['date'];
        const result = await dateHandler.dbQuery(tokens, originalMessage);
        
        return {
          text: result.response,
          context: { 
            ...sessionContext, 
            lastTopic: 'date',
            relevantData: result.data
          }
        };
      }
    }
  } catch (error) {
    console.error('Error checking for month mentions:', error);
  }
  
  // Follow-up on previous topic
  if (sessionContext.lastTopic && sessionContext.relevantData) {
    // Customize follow-up based on previous topic
    const followUpResponses = {
      'event types': `Based on your interest, I'd recommend checking out our upcoming events in the ${sessionContext.relevantData[0]} category. Would you like to see these events?`,
      'pricing': `Would you like to see events within a specific price range?`,
      'events': `Would you like more details about any of these events? Just mention the event name.`,
      'location': `Would you like to know about upcoming events at any of these locations?`,
      'event details': `Would you like to know about similar events in the ${sessionContext.currentEvent?.category} category?`,
      'availability': `Would you like to be notified when new events are scheduled?`,
      'date': `Would you like to see events in a different month or at a specific location?`
    };
    
    const followUp = followUpResponses[sessionContext.lastTopic];
    if (followUp) {
      return {
        text: followUp,
        context: sessionContext
      };
    }
  }
  
  // Fallback response with suggestions
  return {
    text: "I'm not sure I understand what you're looking for. I can help you with finding events, checking prices, viewing locations, and getting event details. What would you like to know?",
    context: sessionContext
  };
}

// Initialize or retrieve a chat session
exports.initSession = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Create a new session
    const sessionId = uuidv4();
    const session = new ChatSession({
      sessionId,
      userId: userId || null,
      context: {} // Initialize empty context
    });
    
    await session.save();
    
    // Add welcome message
    const welcomeMessage = new ChatMessage({
      sessionId,
      userId: userId || null,
      message: "Hi there! I'm your event assistant. I can help you find events, check availability, and provide event details. What type of events are you interested in?",
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
    
    // Find session
    const session = await ChatSession.findOne({ sessionId });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }
    
    // Update session last activity
    session.lastActivity = Date.now();
    
    // Save user message
    const userMessage = new ChatMessage({
      sessionId,
      userId: userId || null,
      message,
      isBot: false
    });
    
    await userMessage.save();
    
    // Process message with context and generate bot response
    const response = await processChatMessage(message, session.context || {});
    
    // Update session context
    session.context = response.context;
    await session.save();
    
    // Save bot response
    const botMessage = new ChatMessage({
      sessionId,
      userId: userId || null,
      message: response.text,
      isBot: true
    });
    
    await botMessage.save();
    
    res.status(200).json({
      success: true,
      response: botMessage,
      context: response.context // Optionally return context for debugging
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
    
    // Add a goodbye message
    const goodbyeMessage = new ChatMessage({
      sessionId,
      userId: session.userId,
      message: "Thank you for using our event chatbot. We hope to see you at one of our events soon!",
      isBot: true
    });
    
    await goodbyeMessage.save();
    
    res.status(200).json({
      success: true,
      message: 'Chat session ended successfully',
      goodbyeMessage
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

// Analytics endpoint to get insights on common questions
exports.getAnalytics = async (req, res) => {
  try {
    // Get top topics discussed
    const allMessages = await ChatMessage.find({ isBot: false });
    const topicCounts = {};
    
    for (const msg of allMessages) {
      const tokens = tokenizer.tokenize(msg.message.toLowerCase());
      
      for (const [topic, info] of Object.entries(eventTopics)) {
        if (info.keywords.some(keyword => msg.message.toLowerCase().includes(keyword))) {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
          break; // Count only one topic per message
        }
      }
    }
    
    // Get most discussed events
    const eventMentions = {};
    const eventTitles = await Event.distinct('title');
    
    for (const msg of allMessages) {
      for (const title of eventTitles) {
        if (msg.message.toLowerCase().includes(title.toLowerCase())) {
          eventMentions[title] = (eventMentions[title] || 0) + 1;
        }
      }
    }
    
    // Get session statistics
    const totalSessions = await ChatSession.countDocuments();
    const activeSessions = await ChatSession.countDocuments({ isActive: true });
    const averageMessagesPerSession = allMessages.length / totalSessions || 0;
    
    res.status(200).json({
      success: true,
      analytics: {
        totalSessions,
        activeSessions,
        averageMessagesPerSession,
        topTopics: Object.entries(topicCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([topic, count]) => ({ topic, count })),
        topEvents: Object.entries(eventMentions)
          .sort((a, b) => b[1] - a[1])
          .map(([event, count]) => ({ event, count }))
      }
    });
  } catch (error) {
    console.error('Error generating analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate analytics',
      error: error.message
    });
  }
};

// Add recommended events endpoint
exports.getRecommendedEvents = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'SessionId is required'
      });
    }
    
    // Find session and check context
    const session = await ChatSession.findOne({ sessionId });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }
    
    let recommendedEvents = [];
    
    // If user showed interest in a specific category
    if (session.context && session.context.relevantData) {
      const category = Array.isArray(session.context.relevantData) 
        ? session.context.relevantData[0] 
        : session.context.relevantData.category;
      
      if (category) {
        recommendedEvents = await Event.find({ 
          category: category,
          date: { $gte: new Date() }
        })
        .sort({ date: 1 })
        .limit(3);
      }
    }
    
    // If no category preference, recommend upcoming events
    if (recommendedEvents.length === 0) {
      recommendedEvents = await Event.find({ 
        date: { $gte: new Date() }
      })
      .sort({ date: 1 })
      .limit(3);
    }
    
    res.status(200).json({
      success: true,
      recommendedEvents
    });
  } catch (error) {
    console.error('Error getting recommended events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommended events',
      error: error.message
    });
  }
};