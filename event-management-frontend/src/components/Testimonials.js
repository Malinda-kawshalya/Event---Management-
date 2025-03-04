import React from "react";
import "../css/TestimonialsSection.css";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Concert Enthusiast",
    image: "testimonial1.jpg",
    quote: "This platform made getting tickets so simple! The user interface is intuitive and I received my tickets instantly.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Sports Fan",
    image: "testimonial2.jpg",
    quote: "I've tried many ticketing sites, but this one has the best pricing and no hidden fees. Will definitely use again!",
    rating: 5
  },
  {
    id: 3,
    name: "Amelia Rodriguez",
    role: "Workshop Attendee",
    image: "testimonial3.jpg",
    quote: "Customer service is outstanding. When I had an issue with my booking, they resolved it within minutes.",
    rating: 4
  }
];

const features = [
  { icon: "🔒", title: "Secure Payments", description: "Bank-level encryption for all transactions" },
  { icon: "⚡", title: "Instant Delivery", description: "Digital tickets delivered immediately to your device" },
  { icon: "💯", title: "Guaranteed Authenticity", description: "All tickets verified and guaranteed" },
  { icon: "🎁", title: "No Hidden Fees", description: "Transparent pricing with no surprises at checkout" }
];

const TestimonialsSection = () => {
  return (
    <div className="testimonials-section">
      <div className="testimonials-content">
        <div className="testimonials-header">
          <h2 className="category-titl">Trusted by <span className="highlight">Thousands</span></h2>
          <p className="testimonials-subtitle">See why people choose us for their ticketing needs</p>
        </div>

        <div className="features-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="testimonials-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-image-container">
                  <img 
                    src={`/images/${testimonial.image}`} 
                    alt={testimonial.name} 
                    className="testimonial-image"
                  />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < testimonial.rating ? "filled" : ""}`}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        <div className="trust-badges">
          <h3 className="trust-title">Secure Payment Options</h3>
          <div className="payment-methods">
            <div className="payment-method">Visa</div>
            <div className="payment-method">Mastercard</div>
            <div className="payment-method">PayPal</div>
            <div className="payment-method">Apple Pay</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;