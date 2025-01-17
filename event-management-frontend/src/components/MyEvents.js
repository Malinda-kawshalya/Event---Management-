import React, { useState } from "react";
import "../css/MyEvents.css";

const MyEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2025",
      date: "February 24, 2025",
      location: "123 Tech Street, City, Country",
    },
    {
      id: 2,
      title: "Art Workshop",
      date: "March 10, 2025",
      location: "456 Art Avenue, City, Country",
    },
  ]);

  const handleCancelRSVP = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    alert("RSVP cancelled for the event!");
  };

  const handleViewDetails = (event) => {
    alert(`Viewing details for: ${event.title}`);
    // Navigate to event details page or display modal
  };

  return (
    <div className="my-events">
      <h1>My Events</h1>
      {events.length === 0 ? (
        <p className="no-events">You have not RSVP’d for any events yet.</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id} className="event-item">
              <div className="event-details">
                <h2>{event.title}</h2>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
              <div className="event-actions">
                <button
                  className="details-button"
                  onClick={() => handleViewDetails(event)}
                >
                  View Event Details
                </button>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelRSVP(event.id)}
                >
                  Cancel RSVP
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
