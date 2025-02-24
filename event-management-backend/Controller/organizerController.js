const Organizer = require("../Model/organizerModel");
const bcrypt = require("bcryptjs");
const Event = require("../Model/eventModel"); // Ensure the correct path

// Get all organizers
const getOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find().select("-password"); // Exclude passwords
    res.status(200).json(organizers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single organizer
const getOrganizer = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id).select(
      "-password"
    );
    if (!organizer)
      return res.status(404).json({ message: "Organizer not found" });
    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new organizer
const createOrganizer = async (req, res) => {
  const { name, email, phone, password, companyName, companyAddress } =
    req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !companyName ||
    !companyAddress
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingOrganizer = await Organizer.findOne({ email });
    if (existingOrganizer) {
      return res.status(400).json({ message: "Organizer already exists with this email." });
    }
    
    // Ensure password is hashed before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const organizer = new Organizer({
      name,
      email,
      phone,
      password: hashedPassword, // Ensure hashed password is stored
      companyName,
      companyAddress,
    });
    
    await organizer.save();
    
    res
      .status(201)
      .json({ message: "Organizer registered successfully", organizer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an organizer
const updateOrganizer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password, companyName, companyAddress } =
    req.body;

  try {
    const organizer = await Organizer.findById(id);
    if (!organizer)
      return res.status(404).json({ message: "Organizer not found" });

    if (name) organizer.name = name;
    if (email) organizer.email = email;
    if (phone) organizer.phone = phone;
    if (companyName) organizer.companyName = companyName;
    if (companyAddress) organizer.companyAddress = companyAddress;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      organizer.password = await bcrypt.hash(password, salt);
    }

    await organizer.save();
    res
      .status(200)
      .json({ message: "Organizer updated successfully", organizer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an organizer
const deleteOrganizer = async (req, res) => {
  const { id } = req.params;

  try {
    const organizer = await Organizer.findByIdAndDelete(id);
    if (!organizer)
      return res.status(404).json({ message: "Organizer not found" });
    res.status(200).json({ message: "Organizer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get organizer's events
const getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.params.id })
      .select("title date location ticketPrice ticketsSold banner description")
      .sort({ date: "asc" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get organizer's statistics
const getOrganizerStats = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.params.id });
    const stats = events.reduce(
      (acc, event) => ({
        totalEvents: acc.totalEvents + 1,
        ticketsSold: acc.ticketsSold + (event.ticketsSold || 0),
        totalRevenue:
          acc.totalRevenue + (event.ticketsSold || 0) * event.ticketPrice,
      }),
      {
        totalEvents: 0,
        ticketsSold: 0,
        totalRevenue: 0,
      }
    );
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create event for organizer
const createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.params.id,
    });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating event", error: error.message });
  }
};

// Update organizer's event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.eventId, organizer: req.params.id },
      req.body,
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating event", error: error.message });
  }
};

// Delete organizer's event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.eventId,
      organizer: req.params.id,
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};

// Export all functions properly
module.exports = {
  getOrganizers,
  getOrganizer,
  createOrganizer,
  updateOrganizer,
  deleteOrganizer,
  getOrganizerEvents,
  getOrganizerStats,
  createEvent,
  updateEvent,
  deleteEvent,
  
};
