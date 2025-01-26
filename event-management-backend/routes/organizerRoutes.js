const express = require('express');
const { getOrganizers, getOrganizer, createOrganizer, updateOrganizer, deleteOrganizer } = require('../controllers/organizerController');

const router = express.Router();

router.get('/', getOrganizers);
router.get('/:id', getOrganizer);
router.post('/register', createOrganizer);
router.put('/:id', updateOrganizer);
router.delete('/:id', deleteOrganizer);

module.exports = router;