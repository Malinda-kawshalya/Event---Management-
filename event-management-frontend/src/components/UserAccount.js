import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/UserAccount.css";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
          setPreviewImage(response.data.profilePicture || 'https://via.placeholder.com/150');
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!profilePicture) return;

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post(`http://localhost:5000/api/users/upload-profile-picture`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        setUser({ ...user, profilePicture: response.data.profilePicture });
        alert('Profile picture updated successfully!');
      }
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      alert('Failed to upload profile picture.');
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <div className="profile-picture-container">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="profile-picture rounded-circle"
                />
                <div className="profile-picture-overlay">
                  <label htmlFor="profilePictureUpload" className="btn btn-light btn-sm">
                    <i className="bi bi-camera"></i>
                  </label>
                  <input
                    type="file"
                    id="profilePictureUpload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <Button variant="primary" className="mt-3" onClick={handleUpload}>
                Upload Picture
              </Button>
              <h3 className="card-title mt-3">{user?.name}</h3>
              <p className="text-muted">{user?.email}</p>
              <p><strong>Role:</strong> {user?.role}</p>
              <p><strong>Member Since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserAccount;