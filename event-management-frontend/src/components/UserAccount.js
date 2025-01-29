import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/UserAccount.css";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p className="text-danger">Error: {error}</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="text-center my-5">
        <p>No user data found</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Profile Information</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          </div>
        </Col>
        <Col md={8}>
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title">My Bookings</h3>
              {user.bookings && user.bookings.length > 0 ? (
                <ul className="list-unstyled">
                  {user.bookings.map((booking) => (
                    <li key={booking._id} className="mb-3">
                      <h5>{booking.eventTitle}</h5>
                      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Tickets: {booking.tickets}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bookings found</p>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserAccount;