import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the event ID from the URL
import { Container, Row, Col, Button, Form, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/EventDetails.css"; // Optional additional CSS

const EventDetails = () => {
  const { eventId } = useParams(); // Get the event ID from the route parameter
  const [event, setEvent] = useState(null);
  const [isRSVP, setIsRSVP] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reservation, setReservation] = useState({
    tickets: 1,
    contact: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event data from the backend
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          throw new Error("Failed to fetch event details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

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

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="event-details mt-4">
      <Row>
        <Col md={6} className="mb-4">
          <img
            src={event.banner ? `http://localhost:5000/${event.banner}` : "https://via.placeholder.com/600x400"}
            alt={event.title}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <h1>{event.title}</h1>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p>
            <strong>Details:</strong> {event.description}
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
          <p>Email: {event.contactEmail || "info@example.com"} | Phone: {event.contactPhone || "+1-234-567-890"}</p>
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
