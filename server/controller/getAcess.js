const User = require('../models/User');

const getAcess = async (req, res, next) => {
  const { token } = req.body;

  // Check if the token is provided
  if (!token) {
    return res.status(400).json({ message: "Token is missing", status: false });
  }

  try {
    // Find user with the provided token
    const findedUser = await User.findOne({ 'otp.token': token });
    console.log('Found user:', findedUser);
    console.log('Provided token:', token);

    // If no user is found or the token is null, return an error
    if (!findedUser || !findedUser.otp.token) {
      return res.status(400).json({ message: "Invalid token or user not found", status: false });
    }

    // If the user is found and the token is valid
    res.status(200).json({ message: "success", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = getAcess;
