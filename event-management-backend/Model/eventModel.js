const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    maxAttendees: { type: Number, required: true },
    category: { type: String, required: true },
    banner: { type: String },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true }, // Link to organizer
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
