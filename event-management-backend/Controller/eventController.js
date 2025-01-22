// filepath: /C:/Users/PATHAYAA/Desktop/Event Managment/Event---Management-/event-management-backend/controllers/eventController.js
const Event = require('../Model/eventModel');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store the uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({ storage });

// Create a new event
const createEvent = async (req, res) => {
    const { title, description, date, time, location, price, maxAttendees, category } = req.body;
    const banner = req.file ? req.file.path : null;

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            time,
            location,
            price,
            maxAttendees,
            category,
            banner,
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { createEvent, getAllEvents, upload };