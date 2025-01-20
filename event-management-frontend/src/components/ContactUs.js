import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/contacts', formData);
            console.log('Contact added:', response.data);
            setNotification({ message: 'Message sent successfully!', type: 'success' });
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form fields
        } catch (error) {
            console.error('Error adding contact:', error);
            setNotification({ message: 'Error sending message. Please try again.', type: 'danger' });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Contact Us</h2>
            {notification.message && (
                <div className={`alert alert-${notification.type}`} role="alert">
                    {notification.message}
                </div>
            )}
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h4>Contact Information</h4>
                    <p><strong>Address:</strong> 123 Event Street, City, Country</p>
                    <p><strong>Phone:</strong> +123 456 7890</p>
                    <p><strong>Email:</strong> contact@eventmanagement.com</p>
                    <h4>Follow Us</h4>
                    <div>
                        <a href="#" className="btn btn-outline-primary me-2">Facebook</a>
                        <a href="#" className="btn btn-outline-info me-2">Twitter</a>
                        <a href="#" className="btn btn-outline-danger me-2">Instagram</a>
                        <a href="#" className="btn btn-outline-secondary">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;