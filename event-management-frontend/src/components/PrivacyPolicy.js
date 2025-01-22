import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivacyPolicy = () => {
    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                    <h1 className="text-center mb-4 display-4 text-primary fw-bold">Privacy Policy</h1>
                    <div className="privacy-content">
                        <p className="lead fs-5 text-muted">
                            Welcome to our Event Management Platform. We respect your privacy and are committed to protecting it. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
                        </p>

                        <h2 className="mt-5 fs-3 text-primary fw-bold">1. Information We Collect</h2>
                        <p className="fs-5 text-muted">We may collect the following types of information:</p>
                        <ul className="list-group list-group-flush fs-5 text-muted">
                            <li className="list-group-item bg-light">Personal details such as name, email, phone number, and address.</li>
                            <li className="list-group-item bg-light">Payment information for processing transactions.</li>
                            <li className="list-group-item bg-light">Usage data to improve your experience on our platform.</li>
                        </ul>

                        <h2 className="mt-5 fs-3 text-primary fw-bold">2. How We Use Your Information</h2>
                        <p className="fs-5 text-muted">Your information is used to:</p>
                        <ul className="list-group list-group-flush fs-5 text-muted">
                            <li className="list-group-item bg-light">Provide and improve our services.</li>
                            <li className="list-group-item bg-light">Process transactions securely.</li>
                            <li className="list-group-item bg-light">Respond to your inquiries and provide customer support.</li>
                            <li className="list-group-item bg-light">Send updates about events or promotions, with your consent.</li>
                        </ul>

                        <h2 className="mt-5 fs-3 text-primary fw-bold">3. Data Sharing and Security</h2>
                        <p className="fs-5 text-muted">
                            We do not sell or share your data with third parties, except when required by law. All data is stored securely, and we use encryption to protect your sensitive information.
                        </p>

                        <h2 className="mt-5 fs-3 text-primary fw-bold">4. Cookies and Tracking</h2>
                        <p className="fs-5 text-muted">
                            Our platform uses cookies to enhance your browsing experience. You can control cookie settings through your browser.
                        </p>

                        <h2 className="mt-5 fs-3 text-primary fw-bold">5. Your Rights</h2>
                        <p className="fs-5 text-muted">You have the right to:</p>
                        <ul className="list-group list-group-flush fs-5 text-muted">
                            <li className="list-group-item bg-light">Access, update, or delete your data.</li>
                            <li className="list-group-item bg-light">Opt out of receiving promotional communications.</li>
                            <li className="list-group-item bg-light">Request clarification about our data policies.</li>
                        </ul>

                        <h2 className="mt-5 fs-3 text-primary fw-bold">6. Updates to This Privacy Policy</h2>
                        <p className="fs-5 text-muted">
                            We may update this policy periodically. Changes will be posted on this page with an updated date.
                        </p>

                        <h2 className="mt-5 fs-3 text-primary fw-bold">7. Contact Us</h2>
                        <p className="fs-5 text-muted">
                            If you have any questions about this policy, please contact us at:
                            <br />
                            <strong>Email:</strong> privacy@eventmanagement.com
                            <br />
                            <strong>Phone:</strong> +123 456 7890
                        </p>

                        <h2 className="mt-5 fs-3 text-primary fw-bold">8. Data Retention</h2>
                        <p className="fs-5 text-muted">
                            We retain your personal data only as long as necessary to provide you with our services and for legitimate business purposes. When we no longer need your data, we will securely delete or anonymize it.
                        </p>

                        <h2 className="mt-5 fs-3 text-primary fw-bold">9. Third-Party Services</h2>
                        <p className="fs-5 text-muted">
                            Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
