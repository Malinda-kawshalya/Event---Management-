import React, { useState, useEffect } from "react";
import { Nav, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../css/AllEvents.css";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/events"); // Replace with API
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    category === "" ? events : events.filter((event) => event.category === category);

  return (
    <div className="all-events-container">
      <div className="all-events-content">
        <div className="all-events-hero-section">
          <div className="container">
            <h1 className="all-events-hero-title">All Events</h1>
          </div>
        </div>

        <div className="section-padding">
          <Nav
            className="custom-nav-pills justify-content-center mb-4"
            onSelect={(selectedKey) => setCategory(selectedKey || "")}
          >
            <Nav.Item>
              <Nav.Link eventKey="" className={category === "" ? "active" : ""}>All</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="concert" className={category === "concert" ? "active" : ""}>
                Concerts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="workshop" className={category === "workshop" ? "active" : ""}>
                Workshops
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="seminar" className={category === "seminar" ? "active" : ""}>
                Seminars
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sports" className={category === "sports" ? "active" : ""}>
                Sports
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Loading events...</p>
            </div>
          ) : (
            <div className="row">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch" key={event._id}>
                    <Card className="custom-event-card">
                      <Card.Img
                        variant="top"
                        src={`http://localhost:5000/${event.banner}`}
                        alt={event.title}
                        className="custom-card-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-banner.jpg"; // Fallback image
                        }}
                      />
                      <Card.Body className="custom-card-body">
                        <Card.Title className="custom-card-title">{event.title}</Card.Title>
                        <Card.Text className="custom-card-text">{event.description}</Card.Text>
                        <Card.Text className="custom-card-text">
                          <strong>Date:</strong> {event.date} <br />
                          <strong>Time:</strong> {event.time} <br />
                          <strong>Location:</strong> {event.location}
                        </Card.Text>
                        <Button
                          className="custom-buy-button"
                          onClick={() => navigate(`/eventdetails/${event._id}`)}
                        >
                          Buy Tickets
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : (
                <p className="text-center">No events available for this category.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
