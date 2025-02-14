// paymentController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe secret key from environment variables
const asyncHandler = require('express-async-handler');

// Payment handler
const paymentController = asyncHandler(async (req, res) => {
  try {
    const { paymentMethodId, amount } = req.body;

    // Create a PaymentIntent with the amount and the payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: 'inr',
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Return the client secret for handling 3D Secure authentication if needed
    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment failed:', error);
    res.status(500).json({ error: 'Payment failed, please try again.' });
  }
});

module.exports = paymentController;