import React from 'react';
import { Link } from 'react-router-dom';
//import '../css/Dashboard.css';

const OrgDashboard = () => {
  const sampleStats = {
    totalEvents: 8,
    ticketsSold: 1200,
    totalRevenue: 50000,
  };

  const upcomingEvents = [
    { id: 1, title: "Tech Expo 2025", date: "Feb 15, 2025", location: "Colombo" },
    { id: 2, title: "Music Fest", date: "Mar 20, 2025", location: "Kandy" },
    { id: 3, title: "Startup Meetup", date: "Apr 10, 2025", location: "Galle" },
  ];

  return (
    <div className="dashboard container my-5">
      <h1 className="text-primary mb-4">Welcome, Organizer!</h1>
      
      {/* Stats Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="stat-card bg-light p-3 text-center">
            <h5>Total Events</h5>
            <h2>{sampleStats.totalEvents}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card bg-light p-3 text-center">
            <h5>Tickets Sold</h5>
            <h2>{sampleStats.ticketsSold}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card bg-light p-3 text-center">
            <h5>Total Revenue</h5>
            <h2>${sampleStats.totalRevenue}</h2>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-4">
        <h3 className="mb-3">Upcoming Events</h3>
        <div className="row">
          {upcomingEvents.map((event) => (
            <div className="col-md-4 mb-3" key={event.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {event.date}
                    <br />
                    <strong>Location:</strong> {event.location}
                  </p>
                  <Link to={`/event-details/${event.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="d-flex justify-content-between">
        <Link to="/eventcreation" className="btn btn-success">
          Create Event
        </Link>
        <Link to="/manageevents" className="btn btn-secondary">
          Manage Events
        </Link>
      </div>
    </div>
  );
};

export default OrgDashboard;
