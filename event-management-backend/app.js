
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute'); 
const contactRoutes = require('./routes/contactRoutes'); 
const organizerRoutes = require('./routes/organizerRoutes');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoute');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/organizers', organizerRoutes);
app.use('/api', authRoutes);
app.use('/api/events',eventRoutes);




// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;