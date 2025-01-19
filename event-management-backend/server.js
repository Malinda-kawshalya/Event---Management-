// filepath: /C:/Users/PATHAYAA/Desktop/Event Managment/Event---Management-/event-management-backend/server.js
const mongoose = require('mongoose');
const app = require('./app'); // Import the app

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const mongoURI = 'mongodb+srv://mkk2001:mkk2001@eventz.ai6bj.mongodb.net/event-management?retryWrites=true&w=majority'; // Replace with your actual MongoDB connection string

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });