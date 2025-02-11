import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRSVP, setIsRSVP] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reservation, setReservation] = useState({ tickets: 1, contact: "" });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        console.log(`Fetching event details from: http://localhost:5000/api/events/${id}`);
        const response = await fetch(`http://localhost:5000/api/events/${id}`);

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
  }, [id]);

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
        <p className="text-danger">Error: {error}</p>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container className="text-center my-5">
        <p>Event not found</p>
      </Container>
    );
  }

  return (
    <Container className="event-details mt-4">
      <Row>
        <Col md={6} className="mb-4">
          <img 
            src={`http://localhost:5000/${event.banner.replace("\\", "/")}`} 
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
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Price:</strong> ${event.price}</p>
          <p><strong>Category:</strong> {event.category}</p>
          <Button variant="primary" onClick={handleRSVP}>
            {isRSVP ? "Cancel RSVP" : "RSVP"}
          </Button>
          <Button variant="secondary" onClick={handleShare} className="ms-2">
            Share
          </Button>
        </Col>
      </Row>
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
