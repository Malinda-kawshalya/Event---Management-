const express = require('express');
const { getAllUsers, addUsers, getById, updateUser, deleteUser } = require('../Controller/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', addUsers);
router.get('/:id', getById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;