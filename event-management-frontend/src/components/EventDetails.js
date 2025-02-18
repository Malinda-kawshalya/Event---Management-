import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Modal, Spinner, Alert, Badge } from "react-bootstrap";
import { UserContext } from "./contexts/UserContext";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import '../css/EventDetails.css';

const stripePromise = loadStripe('your_publishable_key');

const EventDetails = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [reservation, setReservation] = useState({
    tickets: 1,
    contact: "",
  });
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    if (!eventId) {
      setError("Invalid Event ID");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
      setEvent(response.data);
      setTotalCost(response.data.price || 0);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch event details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "tickets") {
      const tickets = Math.max(1, parseInt(value, 10) || 0);
      setTotalCost(tickets * (event?.price || 0));
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate('/signin', { state: { from: `/event/${eventId}` } });
      return;
    }

    setProcessing(true);
    try {
      // Create reservation
      const reservationResponse = await axios.post(
        "http://localhost:5000/api/reservations",
        {
          eventId: event._id,
          tickets: parseInt(reservation.tickets),
          contact: reservation.contact,
          userId: user._id
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );

      // Navigate to checkout with reservation details
      navigate('/checkout', {
        state: {
          reservation: reservationResponse.data,
          event,
          totalAmount: totalCost,
          ticketCount: reservation.tickets
        }
      });
    } catch (error) {
      setError(error.response?.data?.message || "Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Event link copied!");
    } catch (err) {
      setError("Failed to copy link");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!event) return <ErrorAlert message="Event not found" />;

  return (
    <Container className="event-details-container py-5">
      <Row className="g-4">
        <Col lg={7}>
          <div className="event-image-container">
            <img 
              src={`http://localhost:5000/${event.banner}`}
              alt={event.title}
              className="event-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
              }}
            />
          </div>
        </Col>
        <Col lg={5}>
          <div className="event-info-card">
            <div className="event-header">
              <h1>{event.title}</h1>
              <Badge bg="primary" className="category-badge">
                {event.category || "General"}
              </Badge>
            </div>

            <div className="event-details-section">
              <div className="detail-item">
                <i className="bi bi-calendar-event"></i>
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <i className="bi bi-clock"></i>
                <span>{event.time || "TBA"}</span>
              </div>
              <div className="detail-item">
                <i className="bi bi-geo-alt"></i>
                <span>{event.location || "TBA"}</span>
              </div>
              <div className="detail-item">
                <i className="bi bi-tag"></i>
                <span>${event.price || "Free"}</span>
              </div>
            </div>

            <div className="booking-section">
              <Button 
                variant="primary" 
                size="lg" 
                className="book-button"
                onClick={() => setShowModal(true)}
                disabled={processing}
              >
                Book Tickets
              </Button>
              <Button 
                variant="outline-secondary" 
                className="share-button"
                onClick={handleShare}
              >
                <i className="bi bi-share"></i> Share
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <div className="description-section">
            <h3>About This Event</h3>
            <p>{event.description}</p>
          </div>
        </Col>
      </Row>

      <BookingModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        event={event}
        reservation={reservation}
        totalCost={totalCost}
        onInputChange={handleInputChange}
        onCheckout={handleCheckout}
        processing={processing}
      />
    </Container>
  );
};

const LoadingSpinner = () => (
  <Container className="text-center my-5">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </Container>
);

const ErrorAlert = ({ message }) => (
  <Container className="my-5">
    <Alert variant="danger">{message}</Alert>
  </Container>
);

const BookingModal = ({ show, onHide, event, reservation, totalCost, onInputChange, onCheckout, processing }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>Book Tickets</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            type="number"
            name="tickets"
            value={reservation.tickets}
            onChange={onInputChange}
            min="1"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact Information</Form.Label>
          <Form.Control
            type="text"
            name="contact"
            value={reservation.contact}
            onChange={onInputChange}
            placeholder="Phone number or email"
            required
          />
        </Form.Group>
        <div className="booking-summary">
          <div className="d-flex justify-content-between">
            <span>Price per ticket:</span>
            <span>${event.price}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Number of tickets:</span>
            <span>{reservation.tickets}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>${totalCost}</span>
          </div>
        </div>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
      <Button 
        variant="primary" 
        onClick={onCheckout}
        disabled={processing}
      >
        {processing ? 'Processing...' : 'Proceed to Payment'}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default EventDetails;