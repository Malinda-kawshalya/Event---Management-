import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/EventDetails.css"; // Optional additional CSS

const EventDetails = () => {
  const [isRSVP, setIsRSVP] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reservation, setReservation] = useState({
    tickets: 1,
    contact: "",
  });

  const handleRSVP = () => {
    setIsRSVP(!isRSVP);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmitReservation = (e) => {
    e.preventDefault();
    alert(`Reserved ${reservation.tickets} ticket(s). Contact: ${reservation.contact}`);
    setShowModal(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Event link copied to clipboard!");
  };

  return (
    <Container className="event-details mt-4">
      <Row>
        <Col md={6} className="mb-4">
          <img src="https://via.placeholder.com/600x400" alt="Event" className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <h1>Event Title</h1>
          <p><strong>Date:</strong> February 24, 2025</p>
          <p><strong>Time:</strong> 7:00 PM</p>
          <p><strong>Location:</strong> 123 Event Street, City, Country</p>
          <p>
            <strong>Details:</strong> Join us for an exciting event featuring networking opportunities, fun activities, and more!
          </p>
          <div className="event-actions">
            <Button
              className={`rsvp-button ${isRSVP ? "btn-danger" : "btn-primary"} me-2`}
              onClick={handleRSVP}
            >
              {isRSVP ? "Cancel RSVP" : "RSVP"}
            </Button>
            <Button variant="success" onClick={() => setShowModal(true)} className="me-2">
              Reserve Tickets
            </Button>
            <Button variant="info" onClick={handleShare}>
              Share Event
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          <h2>Contact for More Details</h2>
          <p>Email: info@example.com | Phone: +1-234-567-890</p>
        </Col>
      </Row>

      {/* Reservation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve Tickets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitReservation}>
            <Form.Group className="mb-3" controlId="formTickets">
              <Form.Label>Number of Tickets</Form.Label>
              <Form.Control
                type="number"
                min="1"
                name="tickets"
                value={reservation.tickets}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContact">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="contact"
                value={reservation.contact}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Confirm Reservation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EventDetails;
