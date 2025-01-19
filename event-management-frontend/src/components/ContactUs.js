import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUs = () => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Contact Us</h2>
            <div className="row">
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Your Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Your Email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input type="text" className="form-control" id="subject" placeholder="Subject" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea className="form-control" id="message" rows="5" placeholder="Your Message"></textarea>
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