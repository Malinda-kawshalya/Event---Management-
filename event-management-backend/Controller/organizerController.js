const Organizer = require('../Model/organizerModel');

// Register a new organizer
const registerOrganizer = async (req, res) => {
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
  } catch (error) {
    console.error('Error registering organizer:', error);
    res.status(500).json({ message: 'Failed to register organizer', error: error.message });
  }
};

module.exports = {
  registerOrganizer,
};
