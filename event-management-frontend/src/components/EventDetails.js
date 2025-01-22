import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/EventDetails.css";

const EventDetails = () => {
  const [isRSVP, setIsRSVP] = useState(false);
  const [tickets, setTickets] = useState(1);
  const [attendees, setAttendees] = useState(["Alice", "Bob", "Charlie"]);

  const handleRSVP = () => {
    setIsRSVP(!isRSVP);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Event link copied to clipboard!");
  };

  const handleTicketsChange = (event) => {
    setTickets(event.target.value);
  };

  return (
    <div className="container event-details mt-4">
      <div className="row">
        <div className="col-md-6 event-photos">
          <img
            src="https://via.placeholder.com/400"
            alt="Event"
            className="img-fluid rounded mb-3"
          />
          <img
            src="https://via.placeholder.com/400"
            alt="Event"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6 event-info">
          <h1 className="mb-3">Event Title</h1>
          <p>
            <strong>Date:</strong> February 24, 2025
          </p>
          <p>
            <strong>Time:</strong> 6:00 PM - 10:00 PM
          </p>
          <p>
            <strong>Location:</strong> 123 Event Street, City, Country
          </p>
          <p className="description mb-4">
            Join us for an exciting event with lots of activities, networking, and fun!
          </p>

          <h4 className="mb-3">Reservation</h4>
          <div className="mb-3">
            <label htmlFor="ticketCount" className="form-label">
              Number of Tickets:
            </label>
            <input
              type="number"
              id="ticketCount"
              className="form-control w-50"
              min="1"
              value={tickets}
              onChange={handleTicketsChange}
            />
          </div>

          <div className="event-actions mb-4">
            <button
              className={`btn btn-${isRSVP ? "danger" : "primary"} me-2`}
              onClick={handleRSVP}
            >
              {isRSVP ? "Cancel RSVP" : "RSVP"}
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => alert(attendees.join(", "))}
            >
              View Attendees
            </button>
            <button className="btn btn-info" onClick={handleShare}>
              Share Event
            </button>
          </div>

          <h4>Contact for More Details</h4>
          <p>
            <strong>Email:</strong> contact@event.com
          </p>
          <p>
            <strong>Phone:</strong> +1 234 567 890
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
