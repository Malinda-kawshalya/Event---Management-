const express = require('express');
const { getAllContacts, addContact } = require('../Controller/contactController');

const router = express.Router();

router.get('/', getAllContacts);
router.post('/', addContact);

module.exports = router;