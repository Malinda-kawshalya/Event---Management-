const express = require("express");
const router = express.Router();
const reservationController = require("../Controller/reservationController");
const { authenticateToken } = require("../Controller/authController");

// Create a new reservation
router.post("/", authenticateToken, reservationController.createReservation);

// Get all reservations for a specific event
router.get("/:eventId", reservationController.getReservationsByEvent);
// Get all reservations for a specific user
router.get("/user/:userId", reservationController.getReservationsByUser);
// get specific event for a specific user
router.get("/user/:userId/:eventId", reservationController.getSpecificEventForUser);


module.exports = router;