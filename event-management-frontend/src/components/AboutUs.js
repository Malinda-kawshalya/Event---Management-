import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AboutUs.css'; // Import the CSS file for custom styles

const AboutUs = () => {
    return (
        <div className="about-us-container">
            {/* Single Container for All Content */}
            <div className="about-us-content">
                {/* Hero Section */}
                <div className="about-hero-section section-padding">
                    <div className="container">
                        <h1 className="about-hero-title">About Us</h1>
                        {/* <p className="about-hero-subtitle">
                            Your Trusted Partner in Online Event Ticketing and Management
                        </p> */}
                    </div>
                </div>

                {/* Introduction Section */}
                <div className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <p className="text-justify">
                                    Welcome to <strong>Event Guru</strong>, the ultimate platform for managing and booking tickets for events. Whether you're organizing a concert, workshop, seminar, or any other event, we provide the tools and services to make your event a success. Our platform is designed to simplify the entire event management process, from planning and promotion to ticket sales and attendee engagement.
                                </p>
                                <p className="text-justify">
                                    At Event Guru, we understand the challenges of organizing events. That's why we offer a comprehensive suite of features, including easy ticket booking, event promotion tools, real-time analytics, and 24/7 customer support. Our mission is to empower event organizers and provide attendees with a seamless and enjoyable experience.
                                </p>
                                <p className="text-justify">
                                    With over a decade of experience in the event management industry, we have built a reputation for reliability, innovation, and excellence. Our platform is trusted by thousands of organizers and attendees worldwide. Whether you're hosting a small local event or a large international conference, Event Guru has everything you need to make your event a success.
                                </p>
                                <p className="text-justify">
                                    Join us today and discover why Event Guru is the preferred choice for event management and ticketing. Let us help you create unforgettable experiences for your attendees and achieve your event goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision and Mission Section */}
                <div className="vision-mission-section section-padding">
                    <div className="container">
                        <div className="row">
                            {/* Vision Box */}
                            <div className="col-md-6">
                                <div className="vision-box">
                                    <h2>Our Vision</h2>
                                    <p>
                                        To become the leading global platform for event management and ticketing, empowering organizers and delighting attendees with seamless experiences.
                                    </p>
                                </div>
                            </div>

                            {/* Mission Box */}
                            <div className="col-md-6">
                                <div className="mission-box">
                                    <h2>Our Mission</h2>
                                    <p>
                                        Our mission is to simplify event management and ticketing, making it easy for organizers to create and manage events while providing users with a seamless ticket-booking experience. We aim to connect people with the events they love.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Features Section */}
                <div className="features-section section-padding">
                    <div className="container">
                        <h2 className="mb-4">Why Choose Us?</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <i className="fas fa-ticket-alt feature-icon"></i>
                                <h5>Easy Ticket Booking</h5>
                                <p>Book tickets for your favorite events in just a few clicks.</p>
                            </div>
                            <div className="col-md-4">
                                <i className="fas fa-calendar-check feature-icon"></i>
                                <h5>Event Management</h5>
                                <p>Create, manage, and promote your events effortlessly.</p>
                            </div>
                            <div className="col-md-4">
                                <i className="fas fa-headset feature-icon"></i>
                                <h5>24/7 Support</h5>
                                <p>We're here to help you anytime, anywhere.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="team-section section-padding">
                    <div className="container">
                        <h2 className="mb-4">Meet Our Team</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <img src="path_to_image1.jpg" className="img-fluid rounded-circle mb-3 team-image" alt="Malinda Kawshalya" />
                                <h5>Malinda Kawshalya</h5>
                                <p>Frontend Developer | Passionate about creating user-friendly interfaces.</p>
                            </div>
                            <div className="col-md-4">
                                <img src="path_to_image2.jpg" className="img-fluid rounded-circle mb-3 team-image" alt="Ravindu Pahan" />
                                <h5>Ravindu Pahan</h5>
                                <p>Backend Developer | Expert in building scalable and secure systems.</p>
                            </div>
                            <div className="col-md-4">
                                <img src="path_to_image3.jpg" className="img-fluid rounded-circle mb-3 team-image" alt="Thilina Sandaruwan" />
                                <h5>Thilina Sandaruwan</h5>
                                <p>Full Stack Developer | Loves solving complex problems with elegant solutions.</p>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default AboutUs;