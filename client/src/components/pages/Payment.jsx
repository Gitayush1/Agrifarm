// Payment.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Optional for toast notifications
import './Payment.css';
import apis from '../../utils/apis';
import { useNavigate } from 'react-router-dom';

export const Payment = () => {
  const [amount, setAmount] = useState(10); // Amount in USD
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message);
        setLoading(false);
        toast.error(error.message);
        return;
      }

      const { data } = await axios.post(apis().paymentController, {
        paymentMethodId: paymentMethod.id,
        amount: amount,
      });

      if (data.success) {
        toast.success('Payment Successful!');
        setLoading(false);
      } else {
        toast.error('Payment failed, please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <form onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label>Card Details</label>
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
              },
            }}
          />
        </div>
        {paymentError && <div className="error-message">{paymentError}</div>}
        <div className="form-group">
          <button onClick ={navigate('/Paymentsuccess')}className="paymentbutton" type="submit" disabled={!stripe || loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
};
