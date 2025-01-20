// filepath: /C:/Users/PATHAYAA/Desktop/Event Managment/Event---Management-/event-management-backend/controllers/contactController.js
const Contact = require('../Model/contactModel');

// Get all contacts
const getAllContacts = async (req, res, next) => {
    let contacts;

    try {
        contacts = await Contact.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!contacts || contacts.length === 0) {
        return res.status(404).json({ message: "No contacts found" });
    }

    return res.status(200).json({ contacts });
};

// Add a contact
const addContact = async (req, res, next) => {
    const { name, email, subject, message } = req.body;

    let contact;
    try {
        contact = new Contact({ name, email, subject, message });
        await contact.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }

    if (!contact) {
        return res.status(404).json({ message: "Unable to add the contact" });
    }
    return res.status(200).json({ contact });
};

module.exports.getAllContacts = getAllContacts;
module.exports.addContact = addContact;