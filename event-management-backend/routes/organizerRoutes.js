const express = require('express');
const router = express.Router();
const organizerController = require('../Controller/organizerController');

// Routes
router.get('/', organizerController.getOrganizers);
router.get('/:id', organizerController.getOrganizer);
router.post('/', organizerController.createOrganizer);
router.put('/:id', organizerController.updateOrganizer);
router.delete('/:id', organizerController.deleteOrganizer);

module.exports = router;