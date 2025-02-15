// models/Reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", // Reference to the Event model
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  tickets: {
    type: Number,
    required: true,
    min: 1,
  },
  reservationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  notes: {
    type: String,
    default: "",
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;