const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate that both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required", status: false });
  }

  try {
    // Ensure email is in lowercase for consistency
    const formattedEmail = email.toLowerCase();
    
    // Find the user by email
    const foundUser = await User.findOne({ email: formattedEmail });

    // If the user is not found, return an error
    if (!foundUser) {
      return res.status(400).json({ message: "No user found with this email", status: false });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    
    // If the password is incorrect, return an error
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password", status: false });
    }

    // Generate a JWT token for the user
    const accessToken = jwt.sign(
      { email: formattedEmail, userId: foundUser._id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '7d' }
    );

    // Return the login success response with the token and user details
    return res.status(200).json({
      message: "Login successful",
      status: true,
      token: accessToken,
      user: {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name, // Include other user details if necessary
      }
    });
  } catch (error) {
    console.error('Login error:', error); // Log error for debugging
    return res.status(500).json({ message: "Something went wrong", status: false });
  }
};

module.exports = login;
