const express = require("express");
const router = express.Router();
const reservationController = require("../Controller/reservationController");

// Create a new reservation
router.post("/", reservationController.createReservation);

// Get all reservations for a specific event
router.get("/:eventId", reservationController.getReservationsByEvent);

module.exports = router;