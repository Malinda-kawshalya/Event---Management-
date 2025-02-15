const express = require('express');
const { createEvent, getAllEvents, upload, getevent, searchEvents } = require('../Controller/eventController');
const Event = require('../Model/eventModel'); //  Import Event model
const router = express.Router();

router.post('/', upload.single('banner'), createEvent);
router.get('/', getAllEvents);
router.get('/search', searchEvents);
router.get('/:eventId', getevent);

// Fetch events by organizer ID
const mongoose = require('mongoose');

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


module.exports = router;
