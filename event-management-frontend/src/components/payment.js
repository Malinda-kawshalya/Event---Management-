import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('your_publishable_key');

const Payment = ({ eventId, amount, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <div className="payment-container">
        <h3>Complete Your Payment</h3>
        <CheckoutForm 
          eventId={eventId} 
          amount={amount} 
          onSuccess={onSuccess}
        />
      </div>
    </Elements>
  );
};

export default Payment;