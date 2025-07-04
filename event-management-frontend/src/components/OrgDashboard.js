import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { UserContext } from './contexts/UserContext';
import "../css/OrgDashboard.css"; // Import the CSS file

const OrgDashboard = () => {
  const [events, setEvents] = useState([]);
  const [organizerName, setOrganizerName] = useState('');
  const [stats, setStats] = useState({
    totalEvents: 0,
    ticketsSold: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { organizerId } = useParams(); // Get the organizer ID from the URL

  useEffect(() => {
    const fetchOrganizerData = async () => {
      try {
        const token = localStorage.getItem('token'); // Ensure the correct token key is used

        if (!user || !token || user._id !== organizerId) {
          navigate('/signin');
          return;
        }

        setOrganizerName(user.name);

        if (user.role !== 'organizer') {
          navigate('/');
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/events/organizer/${organizerId}`, // Fetch events created by this organizer
          {
              headers: { Authorization: `Bearer ${token}` }
          }
      );
      

        if (response.data) {
          setEvents(response.data);
          calculateStats(response.data);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.response?.data?.message || 'Failed to load events. Please try again.');
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate('/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    const calculateStats = (eventData) => {
      const stats = eventData.reduce(
        (acc, event) => ({
          totalEvents: acc.totalEvents + 1,
          ticketsSold: acc.ticketsSold + (event.ticketsSold || 0),
          totalRevenue: acc.totalRevenue + ((event.ticketsSold || 0) * (event.ticketPrice || 0))
        }),
        { totalEvents: 0, ticketsSold: 0, totalRevenue: 0 }
      );
      setStats(stats);
    };

    fetchOrganizerData();
  }, [navigate, organizerId, user]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" aria-label="Loading">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="dashboard my-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="text-primary-1">Hello, {organizerName}</h1>
        </Col>
        <Col xs="auto">
          <Link to={`/eventcreation/${organizerId}`} className="btn btn-success">
            Create New Event
          </Link>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body className="text-center">
              <h5>Total Events</h5>
              <h2>{stats.totalEvents}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body className="text-center">
              <h5>Tickets Sold</h5>
              <h2>{stats.ticketsSold}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body className="text-center">
              <h5>Total Revenue</h5>
              <h2>${stats.totalRevenue.toFixed(2)}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mb-3">Your Events</h2>
      <Row>
        {events.length > 0 ? (
          events.map((event) => (
            <Col md={4} key={event._id} className="mb-3">
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={event.banner ? `http://localhost:5000/${event.banner}` : "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={event.title || "Event Banner"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}<br />
                    <strong>Location:</strong> {event.location || 'N/A'}<br />
                    <strong>Tickets Sold:</strong> {event.ticketsSold || 0}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link to={`/event/${event._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <Link to={`/edit-event/${event._id}`} className="btn btn-secondary">
                      Edit
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">
              No events found. Create your first event!
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default OrgDashboard;