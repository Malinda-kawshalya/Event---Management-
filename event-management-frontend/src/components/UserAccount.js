import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Spinner,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/UserAccount.css";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]); // Add this line
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userString = localStorage.getItem("user");

        if (!token || !userString) {
          throw new Error("Authentication required");
        }

        const userData = JSON.parse(userString);

        if (!userData || !userData._id) {
          throw new Error("Invalid user data");
        }

        // Fetch both user data and reservations
        const [userResponse, reservationsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${userData._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(
            `http://localhost:5000/api/reservations/user/${userData._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        // Set user data
        if (userResponse.data) {
          setUser(userResponse.data);
        }

        // Set reservations data
        if (reservationsResponse.data) {
          setReservations(reservationsResponse.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || err.message);
        if (err.message === "Authentication required") {
          navigate("/signin");
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
    formData.append("profilePicture", profilePicture);

    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.post(
        `http://localhost:5000/api/users/upload-profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        setUser({ ...user, profilePicture: response.data.profilePicture });
        alert("Profile picture updated successfully!");
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      alert("Failed to upload profile picture.");
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
        {/* User Profile Card */}
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <div className="profile-picture-container">
                <img
                  src={
                    previewImage ||
                    user?.profilePicture ||
                    "default-profile.jpg"
                  }
                  alt="Profile"
                  className="profile-picture rounded-circle"
                />
                <div className="profile-picture-overlay">
                  <label
                    htmlFor="profilePictureUpload"
                    className="btn btn-light btn-sm"
                  >
                    <i className="bi bi-camera"></i>
                  </label>
                  <input
                    type="file"
                    id="profilePictureUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <Button variant="primary" className="mt-3" onClick={handleUpload}>
                Upload Picture
              </Button>
              <h3 className="card-title mt-3">{user?.name}</h3>
              <p className="text-muted">{user?.email}</p>
              <p>
                <strong>Role:</strong> {user?.role}
              </p>
              <p>
                <strong>Member Since:</strong>{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Reservations Card */}
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="card-title">My Bookings</h3>

              {reservations.length > 0 ? (
                <ul className="list-unstyled">
                  {reservations.map((reservation) => {
                    const event = reservation.eventId; // Access event through eventId field

                    return (
                      <li key={reservation._id} className="mb-3 card p-3">
                        <div className="d-flex gap-3">
                          {/* Event Banner */}
                          <div style={{ width: "200px", minWidth: "200px" }}>
                            <img
                              src={
                                event?.banner
                                  ? `http://localhost:5000/${event.banner}`
                                  : "https://via.placeholder.com/200x150?text=No+Image"
                              }
                              alt={event?.title || "Event banner"}
                              className="img-fluid rounded"
                              style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/200x150?text=No+Image";
                              }}
                            />
                          </div>

                          {/* Event Details */}
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h5>{event?.title || "Event Unavailable"}</h5>
                                <p className="mb-1">
                                  <strong>Date:</strong>{" "}
                                  {event?.date
                                    ? new Date(event.date).toLocaleDateString()
                                    : "N/A"}
                                </p>
                                <p className="mb-1">
                                  <strong>Time:</strong> {event?.time || "N/A"}
                                </p>
                                <p className="mb-1">
                                  <strong>Location:</strong>{" "}
                                  {event?.location || "N/A"}
                                </p>
                                <p className="mb-1">
                                  <strong>Tickets Booked:</strong>{" "}
                                  {reservation.tickets}
                                </p>
                                <p className="mb-1">
                                  <strong>Total Cost:</strong> $
                                  {reservation.totalCost?.toFixed(2) || "0.00"}
                                </p>
                                <p className="mb-1">
                                  <strong>Booking Date:</strong>{" "}
                                  {reservation.createdAt
                                    ? new Date(
                                        reservation.createdAt
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </p>
                                <p className="mb-0">
                                  <strong>Status:</strong>{" "}
                                  <span
                                    className={`badge bg-${
                                      reservation.status === "confirmed"
                                        ? "success"
                                        : "warning"
                                    }`}
                                  >
                                    {reservation.status || "pending"}
                                  </span>
                                </p>
                              </div>
                              {event?._id && (
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() =>
                                    navigate(`/eventdetails/${event._id}`)
                                  }
                                >
                                  View Event
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center p-4">
                  <p>No bookings found</p>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/allevents")}
                  >
                    Browse Events
                  </Button>
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
