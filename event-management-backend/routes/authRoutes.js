// routes/authRoutes.js
const express = require('express');
const { signIn } = require('../Controller/authController');
const router = express.Router();

// Sign in route (common for both attendee and organizer)
router.post('/signin', signIn);

module.exports = router;
