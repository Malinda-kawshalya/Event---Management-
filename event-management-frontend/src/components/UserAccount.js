import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/UserAccount.css"; // Optional additional CSS

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user"); 
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading user data...</p>
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
      <div className="row">
        {/* User Profile Section */}
        <div className="col-md-4">
          <div className="card shadow p-4 mb-4">
            <h3 className="text-center">User Profile</h3>
            <hr />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h3 className="text-center">My Tickets</h3>
            <hr />
            {user.tickets.length > 0 ? (
              <ul className="list-group">
                {user.tickets.map((ticket) => (
                  <li key={ticket.id} className="list-group-item">
                    <p><strong>Event:</strong> {ticket.event}</p>
                    <p><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {ticket.time}</p>
                    <p><strong>Price:</strong> {ticket.price}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tickets found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;