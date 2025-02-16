const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", // Reference to the Event model
    required: true,
  },
  tickets: {
    type: Number,
    required: true,
    min: 1,
  },
  contact: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;