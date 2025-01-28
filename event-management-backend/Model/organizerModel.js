const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true /*select: false */}, // Exclude from queries by default
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
});

module.exports = mongoose.model('Organizer', organizerSchema);