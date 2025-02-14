const User = require("../models/User");

const bagSection = async (req, res) => {
    console.log(req.body)
  const { name, email, mobile, address, crops, totalAmount } = req.body;
    
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = crops;
    user.mobile = mobile;
    user.address = address;
    user.totalAmount = totalAmount;
    await user.save();

    res.status(200).json({ message: "Bag data saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save bag data", error });
  }
};
module.exports = bagSection;
