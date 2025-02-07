const express = require("express");
const router = express.Router();
const organizerController = require("../Controller/organizerController");

// Get all organizers
router.get("/", organizerController.getOrganizers);

// Get a single organizer by ID
router.get("/:id", organizerController.getOrganizer);

// Create a new organizer
router.post("/", organizerController.createOrganizer);

// Update an organizer by ID
router.put("/:id", organizerController.updateOrganizer);

// Delete an organizer by ID
router.delete("/:id", organizerController.deleteOrganizer);

// Get all events for a specific organizer
router.get("/:id/events", organizerController.getOrganizerEvents);

// Get statistics for a specific organizer
router.get("/:id/stats", organizerController.getOrganizerStats);

// Create a new event for a specific organizer
router.post("/:id/events", organizerController.createEvent);

// Update an event for a specific organizer
router.put("/:id/events/:eventId", organizerController.updateEvent);

// Delete an event for a specific organizer
router.delete("/:id/events/:eventId", organizerController.deleteEvent);

module.exports = router;