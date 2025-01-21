const express = require('express');
const { registerOrganizer } = require('../Controller/organizerController');

const router = express.Router();

// Route to register a new organizer
router.post('/', registerOrganizer);

module.exports = router;
