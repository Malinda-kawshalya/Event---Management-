import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SpecialShows.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles

const SpecialShows = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();

        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Filter events to include only those in the current month
        const filteredEvents = data.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        });

        setEvents(filteredEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="container mt-5 text-center"><p>Loading events...</p></div>;
  if (error) return <div className="container mt-5 text-center"><p className="text-danger">Error: {error}</p></div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" data-aos="fade-down">What's Happenning This Month</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch" key={event._id} data-aos="fade-up">
            <Card className="custom-event-card">
              <Card.Img
                variant="top"
                src={`http://localhost:5000/${event.banner}`}
                className="custom-card-img"
                alt={event.title}
              />
              <Card.Body className="custom-card-body">
                <Card.Title className="custom-card-title">{event.title}</Card.Title>
                <Card.Text className="custom-card-text">{event.description}</Card.Text>
                <Card.Text className="custom-card-text">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  <br />
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
        ))}
      </div>
    </div>
  );
};

export default SpecialShows;