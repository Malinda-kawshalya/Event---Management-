import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const EventCreation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    maxAttendees: "",
    category: "",
    banner: null, // File input
  });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file inputs separately
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "organizer") {
      alert("You must be logged in as an organizer to create an event.");
      navigate("/signin");
      return;
    }

    // Create a FormData object to handle file and other fields
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("maxAttendees", formData.maxAttendees);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("banner", formData.banner); // Append the file
    formDataToSend.append("organizerId", user._id); // Include organizer ID

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Event created successfully!");
        console.log("Backend Response:", data);
        navigate(`/orgdashboard/${user._id}`); // Redirect to organizer dashboard
      } else {
        const errorData = await response.json();
        console.error("Error creating event:", errorData);
        alert(`Error: ${errorData.message || "Failed to create event."}`);
      }
    } catch (err) {
      console.error("Error during API call:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Create a New Event</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="concert">Concert</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter event description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price Per Ticket</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ticket price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formMaxAttendees">
              <Form.Label>Max Attendees</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter maximum attendees"
                name="maxAttendees"
                value={formData.maxAttendees}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4" controlId="formBanner">
          <Form.Label>Event Banner</Form.Label>
          <Form.Control
            type="file"
            name="banner"
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="me-3">
            Create Event
          </Button>
          <Button variant="secondary" type="reset">
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EventCreation;