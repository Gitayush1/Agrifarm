const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    otp: {
      otp: { type: String },
      sendTime: { type: Number },
      token: { type: String },
    },
    cart: [
      {
        name: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    totalAmount: { type: Number },
    mobile: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
