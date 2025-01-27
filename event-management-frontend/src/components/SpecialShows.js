import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SpecialShows.css";

const SpecialShows = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch events from your backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events"); // Replace with your events endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data); // Assuming your backend returns an array of events
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">This Month's Special Shows</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event._id}>
            <div className="card h-100">
              <img
                src={`http://localhost:5000/${event.banner}`} // Assuming your `banner` field contains the file path
                className="card-img-top"
                alt={event.title}
              />
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  <br />
                  <strong>Location:</strong> {event.location}
                </p>
              </div>
              <div className="card-footer text-center">
                {/* Navigate to EventDetails page */}
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/eventdetails/${event._id}`)} // Pass event ID in the URL
                >
                  Buy Tickets
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialShows;
