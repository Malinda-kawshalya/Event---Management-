
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute'); 
const contactRoutes = require('./routes/contactRoutes'); 
const organizerRoutes = require('./routes/organizerRoutes');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoute');
const reservationRoutes = require('./routes/reservationRoutes');
const chatRoutes = require('./routes/chatRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/organizers', organizerRoutes);
app.use('/api/signin', authRoutes);
app.use('/api/events',eventRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/chat", chatRoutes);




// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;