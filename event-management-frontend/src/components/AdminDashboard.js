import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import '../css/AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [eventCoverImage, setEventCoverImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        coverImage: null,
    });

    const fetchData = async () => {
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        setUsers(usersResponse.data);

        const eventsResponse = await axios.get('http://localhost:5000/api/events');
        setEvents(eventsResponse.data);

        const reservationsResponse = await axios.get('http://localhost:5000/api/reservations');
        setReservations(reservationsResponse.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setEventCoverImage(e.target.files[0]);
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name: formData.name,
            email: formData.email,
        };

        if (currentUser) {
            // Update user
            await axios.put(`http://localhost:5000/api/users/${currentUser.id}`, userData);
        } else {
            // Add new user
            await axios.post('http://localhost:5000/api/users', userData);
        }

        setShowUserModal(false);
        fetchData(); // Refresh data
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', formData.name);
        formData.append('date', formData.date);
        if (eventCoverImage) {
            formData.append('coverImage', eventCoverImage);
        }

        if (currentEvent) {
            // Update event
            await axios.put(`http://localhost:5000/api/events/${currentEvent.id}`, formData);
        } else {
            // Add new event
            await axios.post('http://localhost:5000/api/events', formData);
        }

        setShowEventModal(false);
        fetchData(); // Refresh data
    };

    const handleDeleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        fetchData(); // Refresh data
    };

    const handleDeleteEvent = async (eventId) => {
        await axios.delete(`http://localhost:5000/api/events/${eventId}`);
        fetchData(); // Refresh data
    };

    const userEngagementData = {
        series: [{
            name: 'Engagement',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                type: 'line'
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <section>
                <h2>User Management</h2>
                <Button onClick={() => setShowUserModal(true)}>Add User</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button onClick={() => { setCurrentUser(user); setShowUserModal(true); }}>Edit</Button>
                                    <Button onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>

            <section>
                <h2>Event Management</h2>
                <Button onClick={() => setShowEventModal(true)}>Add Event</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <td>{event._id}</td>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>
                                    <Button onClick={() => { setCurrentEvent(event); setShowEventModal(true); }}>Edit</Button>
                                    <Button onClick={() => handleDeleteEvent(event._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>

            <section>
                <h2>User Engagement</h2>
                <Chart options={userEngagementData.options} series={userEngagementData.series} type="line" />
            </section>

            <section>
                <h2>Event Reservations</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Event</th>
                            <th>User</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation._id}>
                                <td>{reservation._id}</td>
                                <td>{reservation.eventName}</td>
                                <td>{reservation.userName}</td>
                                <td>{reservation.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>

            <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentUser ? 'Edit User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUserSubmit}>
                        <Form.Group controlId="formUserName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentUser ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showEventModal} onHide={() => setShowEventModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentEvent ? 'Edit Event' : 'Add Event'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEventSubmit}>
                        <Form.Group controlId="formEventName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEventDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEventCoverImage">
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="coverImage"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentEvent ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminDashboard;