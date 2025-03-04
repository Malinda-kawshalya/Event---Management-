import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../css/Checkout.css';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, reservation, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post('/api/payment/create-intent', {
        amount: amount * 100,
        reservationId: reservation._id
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      onSuccess(result.paymentIntent);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="card-element-container">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      
      <Button 
        type="submit" 
        variant="primary" 
        className="w-100 mt-4 pay-button"
        disabled={!stripe || loading}
      >
        {loading ? (
          <span>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
          </span>
        ) : (
          `Pay $${amount}`
        )}
      </Button>
    </form>
  );
};

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const { reservation, event, totalAmount, ticketCount } = location.state || {};

  if (!reservation || !event) {
    return (
      <Container className="text-center py-5">
        <Alert variant="danger">Invalid checkout session</Alert>
      </Container>
    );
  }

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      await axios.post('/api/reservations/confirm', {
        reservationId: reservation._id,
        paymentIntentId: paymentIntent.id
      });
      setSuccess(true);
      setTimeout(() => navigate('/my-tickets'), 2000);
    } catch (error) {
      console.error('Error confirming reservation:', error);
    }
  };

  return (
    <Container className="checkout-container py-5">
      {success ? (
        <Card className="text-center success-card">
          <Card.Body>
            <i className="bi bi-check-circle-fill text-success success-icon"></i>
            <h2>Payment Successful!</h2>
            <p>Your tickets have been booked successfully.</p>
            <p>Redirecting to your tickets...</p>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          <Col md={7}>
            <Card className="checkout-card">
              <Card.Header className="card-header-banner">
                <h4 className="mb-0">Complete Your Purchase</h4>
              </Card.Header>
              <Card.Body>
                <Elements stripe={stripePromise}>
                  <CheckoutForm 
                    amount={totalAmount}
                    reservation={reservation}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5}>
            <Card className="order-summary-card">
              <Card.Header className="bg-secondary text-white">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="event-details mb-4">
                  <h6 className="text-primary-1">{event.title}</h6>
                  <p className="text-muted-1 mb-2">
                    <i className="bi bi-calendar-event me-2"></i>
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-muted-1 mb-0">
                    <i className="bi bi-geo-alt me-2"></i>
                    {event.location}
                  </p>
                </div>

                <div className="price-breakdown">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tickets ({ticketCount}x)</span>
                    <span>${event.price} each</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>${totalAmount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Service Fee</span>
                    <span>$2.00</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between total">
                    <strong>Total</strong>
                    <strong>${(parseFloat(totalAmount) + 2).toFixed(2)}</strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CheckoutPage;