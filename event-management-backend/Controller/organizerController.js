const Organizer = require('../Model/organizerModel');

// Get all organizers
exports.getOrganizers = async (req, res) => {
    try {
        const organizers = await Organizer.find();
        res.json(organizers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single organizer
exports.getOrganizer = async (req, res) => {
    try {
        const organizer = await Organizer.findById(req.params.id);
        if (!organizer) return res.status(404).json({ message: 'Organizer not found' });
        res.json(organizer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new organizer
exports.createOrganizer = async (req, res) => {
    const { name, email, phone, password, companyName, companyAddress } = req.body;

    try {
        // Check if the organizer already exists
        const existingOrganizer = await Organizer.findOne({ email });
        if (existingOrganizer) {
            return res.status(400).json({ message: 'Organizer already exists with this email.' });
        }

        // Create a new organizer
        const organizer = new Organizer({
            name,
            email,
            phone,
            password,
            companyName,
            companyAddress,
        });

        // Save the organizer to the database
        await organizer.save();
        res.status(201).json({ message: 'Organizer registered successfully', organizer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update an organizer
exports.updateOrganizer = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, companyName, companyAddress } = req.body;

    try {
        const organizer = await Organizer.findById(id);
        if (!organizer) return res.status(404).json({ message: 'Organizer not found' });

        organizer.name = name || organizer.name;
        organizer.email = email || organizer.email;
        organizer.phone = phone || organizer.phone;
        organizer.password = password || organizer.password;
        organizer.companyName = companyName || organizer.companyName;
        organizer.companyAddress = companyAddress || organizer.companyAddress;

        await organizer.save();
        res.json({ message: 'Organizer updated successfully', organizer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an organizer
exports.deleteOrganizer = async (req, res) => {
    const { id } = req.params;

    try {
        const organizer = await Organizer.findById(id);
        if (!organizer) return res.status(404).json({ message: 'Organizer not found' });

        await organizer.remove();
        res.json({ message: 'Organizer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};