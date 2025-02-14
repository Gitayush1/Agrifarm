import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import apis from '../../utils/apis';
import { useNavigate } from 'react-router-dom';

export const PaymentForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false); // Track card input completion

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !cardComplete) { // Ensure card is complete
      setError('Please enter valid card details.');
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = await axios.post(apis().payment, {
        amount: total * 100, // total in cents
      });

      const { clientSecret } = data;

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setIsProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        navigate('/Paymentsuccess');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleCardChange = (event) => {
    setError(event.error ? event.error.message : '');
    setCardComplete(event.complete); // Update card completion status
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Card Details</label>
        <CardElement
          className="p-3 border border-gray-300 rounded-lg"
          onChange={handleCardChange} // Handle validation changes
        />
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 rounded-lg"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};
