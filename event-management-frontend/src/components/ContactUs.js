import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ContactUs.css'; // Import the CSS file for custom styles

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
        <div className="contact-us-container">
            {/* Hero Section */}
            <div className="contact-hero-section section-padding">
                <div className="container">
                    <h1 className="contact-hero-title">Contact Us</h1>
                    
                </div>
            </div>

            {/* Contact Form and Information Section */}
            <div className="section-padding">
                <div className="container">
                    {notification.message && (
                        <div className={`alert alert-${notification.type}`} role="alert">
                            {notification.message}
                        </div>
                    )}
                    <div className="row">
                        {/* Contact Form */}
                        <div className="col-md-6">
                            <h2 className="mb-4">Send Us a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="name" className="form-label">Name</label>
                                    </div>
                                    <div className="col-md-8">
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
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="email" className="form-label">Email</label>
                                    </div>
                                    <div className="col-md-8">
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
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="subject" className="form-label">Subject</label>
                                    </div>
                                    <div className="col-md-8">
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
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="message" className="form-label">Message</label>
                                    </div>
                                    <div className="col-md-8">
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
                                </div>
                                <div className="row">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="col-md-6">
                            <h2 className="mb-4">Contact Information</h2>
                            <p><strong>Address:</strong> 123 Event Street, City, Country</p>
                            <p><strong>Phone:</strong> +123 456 7890</p>
                            <p><strong>Email:</strong> contact@eventmanagement.com</p>
                            <h2 className="mb-4">Follow Us</h2>
                            <div>
                                <a href="#" className="btn btn-outline-primary me-2">Facebook</a>
                                <a href="#" className="btn btn-outline-info me-2">Twitter</a>
                                <a href="#" className="btn btn-outline-danger me-2">Instagram</a>
                                <a href="#" className="btn btn-outline-secondary">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;