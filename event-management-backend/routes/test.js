const express = require('express');
const User = require('../models/User'); // Import your User model
const router = express.Router();

// Test MongoDB connection
router.get('/test-db', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database test failed' });
  }
});

module.exports = router;

