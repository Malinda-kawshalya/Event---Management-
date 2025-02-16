import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, Modal, Spinner, Alert } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";

const EventDetails = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRSVP, setIsRSVP] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reservation, setReservation] = useState({
    tickets: 1,
    contact: "",
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        setError("Invalid Event ID");
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching event details from: http://localhost:5000/api/events/${eventId}`);
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const data = await response.json();
        console.log("Event details fetched successfully:", data);
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event details:", err);
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

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link");
    }
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
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container className="text-center my-5">
        <Alert variant="warning">Event not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="event-details mt-4">
      <Row>
        <Col md={6} className="mb-4">
          <img 
            src={`http://localhost:5000/${event.banner}`} 
            alt={event.title} 
            className="img-fluid rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </Col>
        <Col md={6}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}</p>
          <p><strong>Time:</strong> {event.time || "TBA"}</p>
          <p><strong>Location:</strong> {event.location || "TBA"}</p>
          <p><strong>Price:</strong> ${event.price ?? "Free"}</p>
          <p><strong>Category:</strong> {event.category || "General"}</p>

          <Button variant={isRSVP ? "danger" : "primary"} onClick={handleRSVP}>
            {isRSVP ? "Cancel RSVP" : "RSVP"}
          </Button>
          <Button variant="secondary" onClick={handleShare} className="ms-2">
            Share
          </Button>
        </Col>
      </Row>

      {/* Reservation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve Tickets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitReservation}>
            <Form.Group controlId="formTickets">
              <Form.Label>Number of Tickets</Form.Label>
              <Form.Control
                type="number"
                name="tickets"
                value={reservation.tickets}
                onChange={handleInputChange}
                min="1"
                required
              />
            </Form.Group>
            <Form.Group controlId="formContact" className="mt-3">
              <Form.Label>Contact Information</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={reservation.contact}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Reserve
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EventDetails;
