// filepath: /C:/Users/PATHAYAA/Desktop/Event Managment/Event---Management-/event-management-backend/models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);