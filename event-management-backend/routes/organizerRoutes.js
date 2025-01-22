const express = require('express');
const { getOrganizers, getOrganizer, createOrganizer } = require('../Controller/organizerController');
const { route } = require('./userRoute');

const router = express.Router();

router.get('/', getOrganizers);
router.get('/:id', getOrganizer);
router.post('/', createOrganizer);

module.exports = router;