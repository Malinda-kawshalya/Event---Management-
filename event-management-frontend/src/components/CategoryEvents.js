import React, { useState, useEffect } from "react";
import { Nav, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import css from "../css/CategoryEvents.css";

const CategoryEvents = () => {
  const [category, setCategory] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/events"); // Replace with your API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on selected category
  const filteredEvents =
    category === "" ? events : events.filter((event) => event.category === category);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Explore Events by Category</h2>

      {/* Category Navigation */}
      <Nav
        variant="pills"
        className="justify-content-center mb-4"
        onSelect={(selectedKey) => setCategory(selectedKey || "")}
      >
        
        <Nav.Item>
          <Nav.Link eventKey="concert" active={category === "concert"}>
            Concerts
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="workshop" active={category === "workshop"}>
            Workshops
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="seminar" active={category === "seminar"}>
            Seminars
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading events...</p>
        </div>
      ) : (
        <div className="row">
          {/* Render filtered events */}
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div className="col-md-4 mb-4" key={event.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${event.banner}`}
                    alt={event.title}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold">{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Button variant="primary">Learn More</Button>
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
  );
};

export default CategoryEvents;
