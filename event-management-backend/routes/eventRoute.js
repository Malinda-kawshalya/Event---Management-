const express = require('express');
const { createEvent, getAllEvents, upload, getevent, searchEvents } = require('../Controller/eventController');
const router = express.Router();

router.post('/', upload.single('banner'), createEvent);
router.get('/', getAllEvents);
router.get('/search', searchEvents);
router.get('/:eventId', getevent);

module.exports = router;