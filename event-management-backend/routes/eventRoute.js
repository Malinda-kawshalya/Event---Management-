const express = require('express');
const { createEvent, getAllEvents, upload } = require('../Controller/eventController');
const router = express.Router();

router.post('/', upload.single('banner'), createEvent);
router.get('/', getAllEvents);

module.exports = router;