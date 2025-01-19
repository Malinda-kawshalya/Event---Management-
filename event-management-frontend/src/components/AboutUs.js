import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">About Us</h1>
            <p className="text-center">
                Welcome to our Event Management platform. We are dedicated to providing the best event management services to make your events memorable and successful.
            </p>
            
            <div className="row mt-5">
                <h2 className="text-center mb-4">Our Web Developers</h2>
                <div className="col-md-4 text-center">
                    <img src="path_to_image1.jpg" className="img-fluid rounded-circle mb-3" alt="Developer 1" />
                    <h5>Developer 1</h5>
                    <p>Short description about Developer 1.</p>
                </div>
                <div className="col-md-4 text-center">
                    <img src="path_to_image2.jpg" className="img-fluid rounded-circle mb-3" alt="Developer 2" />
                    <h5>Developer 2</h5>
                    <p>Short description about Developer 2.</p>
                </div>
                <div className="col-md-4 text-center">
                    <img src="path_to_image3.jpg" className="img-fluid rounded-circle mb-3" alt="Developer 3" />
                    <h5>Developer 3</h5>
                    <p>Short description about Developer 3.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
