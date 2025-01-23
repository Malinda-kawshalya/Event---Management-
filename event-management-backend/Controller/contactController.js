const Contact = require('../Model/contactModel');

// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts); // Return the contacts array directly
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
};

// Add a contact
const addContact = async (req, res, next) => {
    const { name, email, subject, message } = req.body;

    try {
        const contact = new Contact({ name, email, subject, message });
        await contact.save();
        res.status(201).json({ message: 'Contact added successfully', contact });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { getAllContacts, addContact };