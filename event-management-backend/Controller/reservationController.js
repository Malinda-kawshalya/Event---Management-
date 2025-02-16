const Reservation = require("../Model/reservationModel");
const Event = require("../Model/eventModel");

// Create a new reservation
exports.createReservation = async (req, res) => {
  const { eventId, tickets, contact } = req.body;

  try {
    // Fetch the event to get the price
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Calculate total cost
    const totalCost = tickets * event.price;

    // Create a new reservation
    const reservation = new Reservation({
      eventId,
      tickets,
      contact,
      totalCost,
    });

    // Save the reservation to the database
    await reservation.save();

    res.status(201).json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Failed to create reservation" });
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