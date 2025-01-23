import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AdminDashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from 'react-bootstrap';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]); // Initialize as an array
    const [contacts, setContacts] = useState([]); // Initialize as an array
    const [events, setEvents] = useState([]); // Initialize as an array
    const [organizers, setOrganizers] = useState([]); // Initialize as an array
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        phone: '',
        companyName: '',
        companyAddress: ''
    });
    const [editUserId, setEditUserId] = useState(null);
    const [error, setError] = useState(null); // To handle and display errors
    const [loading, setLoading] = useState(true); // To manage loading state
    const [activeTab, setActiveTab] = useState('users'); // To manage active tab
    const [showModal, setShowModal] = useState(false); // To manage modal visibility

    // Fetch users from the database
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            console.log('Fetched users:', response.data); 
            if (response.data && Array.isArray(response.data)) {
                setUsers(response.data); // Access the users array within the response
            } else {
                setUsers([]);
                console.error('Invalid data format from API:', response.data);
            }
        } catch (error) {
            setError('Failed to fetch users.');
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch contacts from the database
    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/contacts');
            console.log('Fetched contacts:', response.data); 
            if (response.data && Array.isArray(response.data)) {
                setContacts(response.data); // Access the contacts array within the response
            } else {
                setContacts([]);
                console.error('Invalid data format from API:', response.data);
            }
        } catch (error) {
            setError('Failed to fetch contacts.');
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch events from the database
    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            console.log('Fetched events:', response.data); 
            if (response.data && Array.isArray(response.data)) {
                setEvents(response.data); // Access the events array within the response
            } else {
                setEvents([]);
                console.error('Invalid data format from API:', response.data);
            }
        } catch (error) {
            setError('Failed to fetch events.');
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch organizers from the database
    const fetchOrganizers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/organizers');
            console.log('Fetched organizers:', response.data); 
            if (response.data && Array.isArray(response.data)) {
                setOrganizers(response.data); // Access the organizers array within the response
            } else {
                setOrganizers([]);
                console.error('Invalid data format from API:', response.data);
            }
        } catch (error) {
            setError('Failed to fetch organizers.');
            console.error('Error fetching organizers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers();
        } else if (activeTab === 'contacts') {
            fetchContacts();
        } else if (activeTab === 'events') {
            fetchEvents();
        } else if (activeTab === 'organizers') {
            fetchOrganizers();
        }
    }, [activeTab]);

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission for add or edit user/organizer
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editUserId) {
                // Update user/organizer
                if (activeTab === 'users') {
                    await axios.put(`http://localhost:5000/api/users/${editUserId}`, formData);
                } else if (activeTab === 'organizers') {
                    await axios.put(`http://localhost:5000/api/organizers/${editUserId}`, formData);
                }
            } else {
                // Add new user/organizer
                if (activeTab === 'users') {
                    await axios.post('http://localhost:5000/api/users', formData);
                } else if (activeTab === 'organizers') {
                    await axios.post('http://localhost:5000/api/organizers', formData);
                }
            }
            setFormData({ name: '', email: '', password: '', confirmPassword: '', age: '', gender: '', phone: '', companyName: '', companyAddress: '' });
            setEditUserId(null);
            if (activeTab === 'users') {
                fetchUsers(); // Refresh user list
            } else if (activeTab === 'organizers') {
                fetchOrganizers(); // Refresh organizer list
            }
            setShowModal(false); // Close the modal
        } catch (error) {
            setError('Error saving user/organizer.');
            console.error('Error saving user/organizer:', error);
        }
    };

    // Handle edit action for user/organizer
    const handleEdit = (item) => {
        setFormData({
            name: item.name,
            email: item.email,
            password: '',
            confirmPassword: '',
            age: item.age || '',
            gender: item.gender || '',
            phone: item.phone || '',
            companyName: item.companyName || '',
            companyAddress: item.companyAddress || ''
        });
        setEditUserId(item._id);
        setShowModal(true); // Open the modal
    };

    // Handle delete action for user/organizer
    const handleDelete = async (id) => {
        try {
            if (activeTab === 'users') {
                await axios.delete(`http://localhost:5000/api/users/${id}`);
                fetchUsers(); // Refresh user list
            } else if (activeTab === 'organizers') {
                await axios.delete(`http://localhost:5000/api/organizers/${id}`);
                fetchOrganizers(); // Refresh organizer list
            }
        } catch (error) {
            setError('Error deleting user/organizer.');
            console.error('Error deleting user/organizer:', error);
        }
    };

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return (
                    <>
                        <h2 className="text-center mb-4">Users</h2>
                        <Button variant="primary" onClick={() => setShowModal(true)}>Add User</Button>
                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.age}</td>
                                            <td>{user.gender}</td>
                                            <td>
                                                <button className="btn btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                );
            case 'contacts':
                return (
                    <>
                        <h2 className="text-center mb-4">Contact Us Messages</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.length > 0 ? (
                                    contacts.map((contact) => (
                                        <tr key={contact._id}>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.subject}</td>
                                            <td>{contact.message}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No contacts found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                );
            case 'events':
                return (
                    <>
                        <h2 className="text-center mb-4">Events</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Location</th>
                                    <th>Price</th>
                                    <th>Max Attendees</th>
                                    <th>Category</th>
                                    <th>Banner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.length > 0 ? (
                                    events.map((event) => (
                                        <tr key={event._id}>
                                            <td>{event.title}</td>
                                            <td>{event.description}</td>
                                            <td>{new Date(event.date).toLocaleDateString()}</td>
                                            <td>{event.time}</td>
                                            <td>{event.location}</td>
                                            <td>{event.price}</td>
                                            <td>{event.maxAttendees}</td>
                                            <td>{event.category}</td>
                                            <td><img src={event.banner} alt={event.title} style={{ width: '100px' }} /></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9">No events found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                );
            case 'organizers':
                return (
                    <>
                        <h2 className="text-center mb-4">Organizers</h2>
                        <Button variant="primary" onClick={() => setShowModal(true)}>Add Organizer</Button>
                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Company Name</th>
                                    <th>Company Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {organizers.length > 0 ? (
                                    organizers.map((organizer) => (
                                        <tr key={organizer._id}>
                                            <td>{organizer.name}</td>
                                            <td>{organizer.email}</td>
                                            <td>{organizer.phone}</td>
                                            <td>{organizer.companyName}</td>
                                            <td>{organizer.companyAddress}</td>
                                            <td>
                                                <button className="btn btn-warning me-2" onClick={() => handleEdit(organizer)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(organizer._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No organizers found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard container mt-5">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                        Users
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => setActiveTab('contacts')}>
                        Contacts
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
                        Events
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'organizers' ? 'active' : ''}`} onClick={() => setActiveTab('organizers')}>
                        Organizers
                    </button>
                </li>
            </ul>
            {renderContent()}

            {/* User/Organizer Form Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editUserId ? 'Edit User/Organizer' : 'Add User/Organizer'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required={!editUserId} // Only required when adding a new user/organizer
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required={!editUserId} // Only required when adding a new user/organizer
                            />
                        </div>
                        {activeTab === 'users' && (
                            <>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        name="age"
                                        className="form-control"
                                        placeholder="Age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <select
                                        name="gender"
                                        className="form-control"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {activeTab === 'organizers' && (
                            <>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="companyName"
                                        className="form-control"
                                        placeholder="Company Name"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="companyAddress"
                                        className="form-control"
                                        placeholder="Company Address"
                                        value={formData.companyAddress}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <button type="submit" className="btn btn-primary w-100">{editUserId ? 'Update' : 'Add'}</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminDashboard;