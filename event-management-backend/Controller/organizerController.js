const Organizer = require('../Model/organizerModel');
const bcrypt = require('bcryptjs');


// Get all organizers
exports.getOrganizers = async (req, res) => {
    try {
        const organizers = await Organizer.find().select('-password'); // Exclude passwords
        res.status(200).json(organizers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a single organizer
exports.getOrganizer = async (req, res) => {
    try {
        const organizer = await Organizer.findById(req.params.id).select('-password'); // Exclude password
        if (!organizer) return res.status(404).json({ message: 'Organizer not found' });
        res.status(200).json(organizer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create a new organizer
exports.createOrganizer = async (req, res) => {
    const { name, email, phone, password, companyName, companyAddress } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password || !companyName || !companyAddress) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if the organizer already exists
        const existingOrganizer = await Organizer.findOne({ email });
        if (existingOrganizer) {
            return res.status(400).json({ message: 'Organizer already exists with this email.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new organizer
        const organizer = new Organizer({
            name,
            email,
            phone,
            password: hashedPassword,
            companyName,
            companyAddress,
        });

        // Save the organizer to the database
        await organizer.save();
        res.status(201).json({ message: 'Organizer registered successfully', organizer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update an organizer
exports.updateOrganizer = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, companyName, companyAddress } = req.body;

    try {
        const organizer = await Organizer.findById(id);
        if (!organizer) return res.status(404).json({ message: 'Organizer not found' });

        // Update fields if provided
        if (name) organizer.name = name;
        if (email) organizer.email = email;
        if (phone) organizer.phone = phone;
        if (companyName) organizer.companyName = companyName;
        if (companyAddress) organizer.companyAddress = companyAddress;

        // Hash and update password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            organizer.password = await bcrypt.hash(password, salt);
        }

        await organizer.save();
        res.status(200).json({ message: 'Organizer updated successfully', organizer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete an organizer
exports.deleteOrganizer = async (req, res) => {
    const { id } = req.params;

    try {
        const organizer = await Organizer.findByIdAndDelete(id);
        if (!organizer) return res.status(404).json({ message: 'Organizer not found' });
        res.status(200).json({ message: 'Organizer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};