const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

// Signin
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));
    
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration during token generation
    const { password: hashedPassword, ...rest } = validUser._doc;
    
    res
      .cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }) // Cookie expiry is 1 hour
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Google Auth
exports.google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration during token generation
      const { password: hashedPassword, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }) // Cookie expiry is 1 hour
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration during token generation
      const { password: hashedPassword2, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }) // Cookie expiry is 1 hour
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// Signout
exports.signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};
