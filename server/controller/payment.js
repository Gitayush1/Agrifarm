// controller/createPaymentIntent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // Replace with your actual secret key

const payment = async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;  // Accept amount and currency from request body

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

module.exports = payment;