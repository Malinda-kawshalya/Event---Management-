import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AboutUs.css'; // Import the CSS file for custom styles

const AboutUs = () => {
    return (
        <div className="about-us-container">
            {/* Hero Section */}
            <div className="about-hero-section text-center py-5">
                <h1 className="about-hero-title">About Us</h1>
                <p className="about-hero-subtitle">
                    Your Trusted Partner in Online Event Ticketing and Management
                </p>
            </div>

            {/* Introduction Section */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <p className="lead text-center">
                            Welcome to <strong>Event Guru</strong>, the ultimate platform for managing and booking tickets for events. Whether you're organizing a concert, workshop, seminar, or any other event, we provide the tools and services to make your event a success.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="mission-section py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Our Mission</h2>
                    <p className="text-center">
                        Our mission is to simplify event management and ticketing, making it easy for organizers to create and manage events while providing users with a seamless ticket-booking experience. We aim to connect people with the events they love.
                    </p>
                </div>
            </div>

            {/* Key Features Section */}
            <div className="features-section py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Why Choose Us?</h2>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <i className="fas fa-ticket-alt feature-icon"></i>
                            <h5>Easy Ticket Booking</h5>
                            <p>Book tickets for your favorite events in just a few clicks.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <i className="fas fa-calendar-check feature-icon"></i>
                            <h5>Event Management</h5>
                            <p>Create, manage, and promote your events effortlessly.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <i className="fas fa-headset feature-icon"></i>
                            <h5>24/7 Support</h5>
                            <p>We're here to help you anytime, anywhere.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="team-section py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Meet Our Team</h2>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img src="path_to_image1.jpg" className="img-fluid rounded-circle mb-3 team-image" alt="Malinda Kawshalya" />
                            <h5>Malinda Kawshalya</h5>
                            <p>Frontend Developer | Passionate about creating user-friendly interfaces.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src="path_to_image2.jpg" className="img-fluid rounded-circle mb-3 team-image" alt="Ravindu Pahan" />
                            <h5>Ravindu Pahan</h5>
                            <p>Backend Developer | Expert in building scalable and secure systems.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src="path_to_image3.jpg" className="img-fluid rounded-circle mb-3 team-image" alt="Thilina Sandaruwan" />
                            <h5>Thilina Sandaruwan</h5>
                            <p>Full Stack Developer | Loves solving complex problems with elegant solutions.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call-to-Action Section */}
            {/* <div className="cta-section text-center py-5">
                <h2>Ready to Get Started?</h2>
                <p>Join us today and experience the best in event management and ticketing.</p>
                <a href="/signup" className="btn btn-primary btn-lg">Sign Up Now</a>
            </div> */}
        </div>
    );
};

export default AboutUs;