const User = require('../models/User');
const bcrypt = require('bcrypt');

const updatePassword = async (req, res, next) => {
    const { password, confirmPassword, token } = req.body;

    try {
        // Validate required fields
        if (!password || !confirmPassword || !token) {
            return res.status(400).json({ message: 'All fields are required', status: false });
        }

        // Find user by token
        const findedUser = await User.findOne({ 'otp.token': token });

        if (!findedUser) {
            return res.status(400).json({ message: 'Invalid or expired token', status: false });
        }

        // Check if OTP token is expired (1 minute expiration)
        const tokenExpiryTime = new Date(findedUser.otp.sendTime).getTime();
        if (tokenExpiryTime < new Date().getTime()) {
            return res.status(400).json({ message: 'Token has expired', status: false });
        }

        // Validate password and confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match', status: false });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password and clear OTP data
        findedUser.password = hashedPassword;
        findedUser.otp.sendTime = null;
        findedUser.otp.token = null;
        await findedUser.save();

        res.status(200).json({ message: 'Password updated successfully', status: true });

    } catch (error) {
        next(error);
    }
};

module.exports = updatePassword;
