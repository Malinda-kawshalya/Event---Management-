import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/UserAccount.css";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const userString = localStorage.getItem('user');

        if (!token || !userString) {
          throw new Error('Authentication required');
        }

        const userData = JSON.parse(userString);
        
        if (!userData || !userData._id) {
          throw new Error('Invalid user data');
        }

        const response = await axios.get(`http://localhost:5000/api/users/${userData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          setUser(response.data);
        } else {
          throw new Error('No user data received');
        }

      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.response?.data?.message || err.message);
        if (err.message === 'Authentication required') {
          navigate('/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // ... existing loading and error handling code ...

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Profile Information</h3>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> {user?.role}</p>
              <p><strong>Member Since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </Col>
        <Col md={8}>
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title">My Bookings</h3>
              {user?.bookings?.length > 0 ? (
                <ul className="list-unstyled">
                  {user.bookings.map((booking) => (
                    <li key={booking._id} className="mb-3 card p-3">
                      <h5>{booking.eventTitle}</h5>
                      <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {booking.time}</p>
                      <p><strong>Tickets:</strong> {booking.tickets}</p>
                      <p><strong>Status:</strong> <span className={`badge bg-${booking.status === 'confirmed' ? 'success' : 'warning'}`}>
                        {booking.status}
                      </span></p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center p-4">
                  <p>No bookings found</p>
                  <a href="/allevents" className="btn btn-primary">Browse Events</a>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserAccount;