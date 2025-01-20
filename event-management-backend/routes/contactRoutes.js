// filepath: /C:/Users/PATHAYAA/Desktop/Event Managment/Event---Management-/event-management-backend/routes/contactRoutes.js
const express = require('express');
const { getAllContacts, addContact } = require('../Controller/contactController');

const router = express.Router();

router.get('/', getAllContacts);
router.post('/', addContact);

module.exports = router;