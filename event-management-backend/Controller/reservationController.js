const Reservation = require("../Model/reservationModel");
const Event = require("../Model/eventModel");

exports.createReservation = async (req, res) => {
  try {
    const { eventId, tickets, contact, userId } = req.body; // Get userId from request body
    
    // Validate required fields
    if (!eventId || !tickets || !contact || !userId) {
      return res.status(400).json({ 
        message: "Missing required fields. Please provide eventId, tickets, contact information, and userId." 
      });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Calculate total cost
    const totalCost = tickets * event.price;

    // Create new reservation with userId from request body
    const reservation = new Reservation({
      userId, // Use userId from request body
      eventId,
      tickets,
      contact,
      totalCost,
    });

    // Save the reservation
    await reservation.save();

    // Update event tickets sold
    await Event.findByIdAndUpdate(eventId, {
      $inc: { ticketsSold: tickets }
    });

    res.status(201).json({ 
      message: "Reservation created successfully", 
      reservation,
      totalCost 
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ 
      message: "Failed to create reservation", 
      error: error.message 
    });
  }
};

// get reservation for a specific user
// Update the getReservationsByUser function
exports.getReservationsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch reservations with populated event details
    const reservations = await Reservation.find({ userId })
      .populate('eventId')  // Populate the event details
      .sort({ createdAt: -1 });  // Sort by newest first

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Failed to fetch reservations' });
  }
};



// Get all reservations for a specific event
exports.getReservationsByEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const reservations = await Reservation.find({ eventId }).populate("eventId");
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};

//get specific event for a specific user
exports.getSpecificEventForUser = async (req, res) => {
  const { eventId, userId } = req.params;

  try {
    const reservations = await Reservation.find({ eventId, userId }).populate("eventId");
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};