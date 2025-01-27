const express = require('express');
const { createEvent, getAllEvents, upload, getevent } = require('../Controller/eventController');
const router = express.Router();

router.post('/', upload.single('banner'), createEvent);
router.get('/', getAllEvents);
router.get('/:eventId', getevent);


module.exports = router;