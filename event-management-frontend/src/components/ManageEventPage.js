import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import "../css/ManageEventPage.css"; // Style file

const ManageEventsPage = () => {
  const [events, setEvents] = useState([]); // State to store events
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events'); // Replace with your API URL
        setEvents(response.data); // Assume response.data contains the list of events
      } catch (err) {
        setError('Failed to fetch events.'); // Handle errors
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures it runs only once

  if (loading) {
    return <div className="text-center py-5">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">{error}</div>;
  }

  return (
    <div className="manage-events">
      <div className="container py-5">
        <h1 className="text-center mb-4">Manage Your Events</h1>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-muted">Your Events</h2>
          <Link to="/create-event" className="btn btn-primary">
            + Create New Event
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1}</td>
                  <td>{event.title}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                  <td>
                    <Link to={`/edit-event/${event.id}`} className="btn btn-sm btn-outline-secondary me-2">
                      Edit
                    </Link>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEventsPage;
