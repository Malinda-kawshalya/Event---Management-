const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);

const testRoutes = require('./routes/test'); // Adjust the path if needed
app.use('/api/test', testRoutes);
