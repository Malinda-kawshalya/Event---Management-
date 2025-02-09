import React, { useState, useEffect } from "react";
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
        setEvents(data);
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
      <h2 className="text-center mb-4" data-aos="fade-down">This Month's Special Shows</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event._id} data-aos="fade-up">
            <div className="card h-100">
              <img
                src={`http://localhost:5000/${event.banner}`}
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
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/eventdetails/${event._id}`)}
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