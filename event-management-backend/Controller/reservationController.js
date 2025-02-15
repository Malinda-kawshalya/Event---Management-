// controllers/reservationController.js
const Reservation = require("../Model/reservationModel");

// Create a new reservation
const createReservation = async (req, res) => {
  const { eventId, contact, tickets, notes } = req.body;

  try {
    // Validate input
    if (!eventId || !contact || !tickets) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new reservation
    const newReservation = new Reservation({
      eventId,
      contact,
      tickets,
      notes,
    });

    // Save the reservation to the database
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ message: "Failed to create reservation" });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("eventId"); // Populate event details
    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id).populate("eventId"); // Populate event details
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (err) {
    console.error("Error fetching reservation:", err);
    res.status(500).json({ message: "Failed to fetch reservation" });
  }
};

// Update a reservation
const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { status, tickets, notes } = req.body;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Update fields if provided
    if (status) reservation.status = status;
    if (tickets) reservation.tickets = tickets;
    if (notes) reservation.notes = notes;

    const updatedReservation = await reservation.save();
    res.status(200).json(updatedReservation);
  } catch (err) {
    console.error("Error updating reservation:", err);
    res.status(500).json({ message: "Failed to update reservation" });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    await reservation.remove();
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (err) {
    console.error("Error deleting reservation:", err);
    res.status(500).json({ message: "Failed to delete reservation" });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};