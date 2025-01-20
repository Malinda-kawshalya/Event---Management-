import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
// Optional CSS file for custom styles
import 'bootstrap/dist/css/bootstrap.min.css';

const EventCreationPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    maxAttendees: "",
    category: "",
    banner: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Implement form submission logic (API call, etc.)
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

export default EventCreationPage;
