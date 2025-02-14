const User = require('../models/User');
const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
  const { email, name, photoURL } = req.body;

  try {
    // Convert email to lowercase for consistency
    const formattedEmail = email.toLowerCase();

    // Check if user already exists
    let user = await User.findOne({ email: formattedEmail });

    // If user doesn't exist, create a new user in MongoDB
    if (!user) {
      user = new User({ email: formattedEmail, name, photoURL }); // Save photoURL
      await user.save();
    } else {
      // Update photoURL if it is not present in the existing user
      user.photoURL = photoURL;
      await user.save();
    }

    // Generate a token for the user
    const accessToken = jwt.sign(
      { email: formattedEmail, userId: user._id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '7d' }
    );

    // Send the response with token and user data
    res.status(200).json({
      message: 'Login successful',
      status: true,
      token: accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL, // Send back the photoURL
      },
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Internal server error', status: false });
  }
};

module.exports = googleLogin;
