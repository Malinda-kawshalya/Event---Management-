import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [eventCoverImage, setEventCoverImage] = useState(null);

    useEffect(() => {
        // Fetch users, events, and reservations from API
    }, []);

    const handleUserSubmit = () => {
        // Handle add/update user
    };

    const handleEventSubmit = (e) => {
        e.preventDefault();
        // Handle add/update event, including the cover image
        const formData = new FormData();
        formData.append('name', currentEvent?.name || '');
        formData.append('date', currentEvent?.date || '');
        if (eventCoverImage) {
            formData.append('coverImage', eventCoverImage);
        }
        // Submit formData to the API
    };

    const handleDeleteUser = (userId) => {
        // Handle delete user
    };

    const handleDeleteEvent = (eventId) => {
        // Handle delete event
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
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button onClick={() => { setCurrentUser(user); setShowUserModal(true); }}>Edit</Button>
                                    <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
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
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>
                                    <Button onClick={() => { setCurrentEvent(event); setShowEventModal(true); }}>Edit</Button>
                                    <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
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
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
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
                            <Form.Control type="text" placeholder="Enter name" defaultValue={currentUser?.name} />
                        </Form.Group>
                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" defaultValue={currentUser?.email} />
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
                            <Form.Control type="text" placeholder="Enter name" defaultValue={currentEvent?.name} />
                        </Form.Group>
                        <Form.Group controlId="formEventDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" defaultValue={currentEvent?.date} />
                        </Form.Group>
                        <Form.Group controlId="formEventCoverImage">
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control type="file" onChange={(e) => setEventCoverImage(e.target.files[0])} />
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