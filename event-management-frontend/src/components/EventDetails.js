import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/EventDetails.css";

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
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
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
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
            src={`http://localhost:5000/${event.banner}`} 
            alt={event.title} 
            className="img-fluid rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </Col>
        {/* Rest of the component remains the same */}
        ...
      </Row>
    </Container>
  );
};

export default EventDetails;