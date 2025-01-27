import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For navigation
import "bootstrap/dist/css/bootstrap.min.css";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // React Router's hook for navigation

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Render events by category
  const renderEventCards = (category) => {
    return events
      .filter((event) => event.category === category)
      .map((event) => (
        <Col md={4} className="mb-4" key={event._id}>
          <Card>
            {event.banner ? (
              <Card.Img
                variant="top"
                src={
                  typeof event.banner === "string"
                    ? event.banner // Use URL if available
                    : URL.createObjectURL(event.banner) // Use createObjectURL for file objects
                }
                alt={event.title}
              />
            ) : (
                <Card.Img
                variant="top"
                src={`http://localhost:5000/${event.banner}`}
                alt={event.title || "Default banner"}
              />
            )}
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Card.Text>
                <strong>Date:</strong> {event.date} <br />
                <strong>Time:</strong> {event.time} <br />
                <strong>Location:</strong> {event.location}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(`/eventdetails/${event._id}`)} // Navigate to EventDetails with the event ID
              >
                Buy Tickets
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ));
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

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">All Events</h1>

      <h2>Concerts</h2>
      <Row>{renderEventCards("concert")}</Row>

      <h2>Workshops</h2>
      <Row>{renderEventCards("workshop")}</Row>

      <h2>Seminars</h2>
      <Row>{renderEventCards("seminar")}</Row>
    </Container>
  );
};

export default AllEvents;
