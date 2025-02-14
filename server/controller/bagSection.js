const User = require("../models/User");
const Order = require("../models/Order");

const bagSection = async (req, res) => {
  try {
    const { email, mobile, address, crops, totalAmount } = req.body;

    // Validate required fields
    if (!email || !mobile || !address || !crops || crops.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new order
    const newOrder = new Order({
      userId: user._id,
      crops,
      totalAmount,
      mobile,
      address,
      paymentStatus: "Pending", // Default status before payment confirmation
    });

    // Save order in database
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!", orderId: newOrder._id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to process order", error: error.message });
  }
};

module.exports = bagSection;
