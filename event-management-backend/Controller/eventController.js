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
    const { title, description, date, time, location, price, maxAttendees, category, organizerId } = req.body; // Add organizerId
    const banner = req.file ? req.file.path : null;

    try {
        if (!organizerId) {
            return res.status(400).json({ message: 'Organizer ID is required' });
        }

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
            organizer: organizerId, // Associate event with organizer
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

const getevent = async (req, res) => {
    try {
        console.log(`Fetching event with ID: ${req.params.eventId}`);
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            console.log('Event not found');
            return res.status(404).json({ message: 'Event not found' });
        }
        console.log('Event found:', event);
        res.json(event);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const searchEvents = async (req, res) => {
    try {
        const query = req.query.query; // Get the search term from the query string

        // Search for events matching the query in title, description, location, or category
        const events = await Event.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive search
                { description: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
            ],
        });

        // If no events are found, return a 404 response
        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found matching your search' });
        }

        // Return the matching events
        res.status(200).json({ message: 'Events found', events });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update an event
const updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const updates = req.body;
    const banner = req.file ? req.file.path : undefined;

    try {
        // If there's a new banner, add it to the updates
        if (banner) {
            updates.banner = banner;
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is the organizer of the event
        if (event.organizer.toString() !== req.body.organizerId) {
            return res.status(403).json({ message: 'Not authorized to edit this event' });
        }

        // Update the event
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { ...updates },
            { new: true } // Return the updated event
        );

        res.status(200).json({
            message: 'Event updated successfully',
            event: updatedEvent
        });
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is the organizer of the event
        if (event.organizer.toString() !== req.body.organizerId) {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};




module.exports = { createEvent, getAllEvents, upload, getevent, searchEvents, updateEvent, deleteEvent };