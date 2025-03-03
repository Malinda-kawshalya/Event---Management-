const express = require('express');
const { 
    createEvent, 
    getAllEvents, 
    upload, 
    getevent, 
    searchEvents,
    updateEvent, 
    deleteEvent 
} = require('../Controller/eventController');
const Event = require('../Model/eventModel');
const router = express.Router();
const mongoose = require('mongoose');

// Create new event
router.post('/', upload.single('banner'), createEvent);

// Get all events
router.get('/', getAllEvents);

// Search events
router.get('/search', searchEvents);

// Get events by organizer
router.get('/organizer/:organizerId', async (req, res) => {
    try {
        const { organizerId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(organizerId)) {
            return res.status(400).json({ message: 'Invalid organizer ID' });
        }

        console.log(`Fetching events for organizer: ${organizerId}`);
        const events = await Event.find({ organizer: organizerId });
        res.json(events);
    } catch (err) {
        console.error('Error fetching organizer events:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get single event
router.get('/:eventId', getevent);

// Update event
router.put('/:eventId', upload.single('banner'), updateEvent);

// Delete event
router.delete('/:eventId', deleteEvent);

module.exports = router;