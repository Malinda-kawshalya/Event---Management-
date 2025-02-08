import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const OrgDashboard = () => {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    ticketsSold: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizerEvents = async () => {
      try {
        const userString = localStorage.getItem('user');
        const token = localStorage.getItem('jwt');

        if (!userString || !token) {
          navigate('/signin');
          return;
        }

        const user = JSON.parse(userString);

        if (!user || user.role !== 'organizer') {
          navigate('/orgdashboard');
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/organizers/${user.id}/events`,
          {
            headers: { 
              Authorization: `Bearer ${token}`
            }
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

    fetchOrganizerEvents();
  }, [navigate]);

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
          <h1 className="text-primary">Organizer Dashboard</h1>
        </Col>
        <Col xs="auto">
          <Link to="/eventcreation" className="btn btn-success">
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

      <div className="mt-4 text-center">
        <Link to="/eventcreation" className="btn btn-success me-3">
          Create New Event
        </Link>
        <Link to="/manageevents" className="btn btn-secondary">
          Manage Events
        </Link>
      </div>
    </Container>
  );
};

export default OrgDashboard;