import React, { useState } from "react";
import "../css/EventDetails.css";

const EventDetails = () => {
  const [isRSVP, setIsRSVP] = useState(false);
  const [attendees, setAttendees] = useState(["Alice", "Bob", "Charlie"]);

  const handleRSVP = () => {
    setIsRSVP(!isRSVP);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Event link copied to clipboard!");
  };

  return (
    <div className="event-details">
      <div className="event-photos">
        <img src="https://via.placeholder.com/400" alt="Event" />
        <img src="https://via.placeholder.com/400" alt="Event" />
      </div>
      <div className="event-info">
        <h1>Event Title</h1>
        <p><strong>Date:</strong> February 24, 2025</p>
        <p><strong>Location:</strong> 123 Event Street, City, Country</p>
        <p className="description">
          Join us for an exciting event with lots of activities, networking, and fun!
        </p>
        <div className="event-actions">
          <button className={isRSVP ? "rsvp-button active" : "rsvp-button"} onClick={handleRSVP}>
            {isRSVP ? "Cancel RSVP" : "RSVP"}
          </button>
          <button className="view-attendees-button" onClick={() => alert(attendees.join(", "))}>
            View Attendees
          </button>
          <button className="share-button" onClick={handleShare}>
            Share Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
