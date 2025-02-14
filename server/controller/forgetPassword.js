const User = require('../models/User');
const crypto = require('crypto');
const sendMail = require('../utils/sendMail');

const forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const formattedEmail = email.toLowerCase();
        const findedUser = await User.findOne({ email: formattedEmail });

        if (!findedUser) {
            return res.status(400).json({ message: "No user found", status: false });
        }

        // Invalidate previous token if exists
        findedUser.otp.token = null;
        await findedUser.save();

        // Proceed with generating a new OTP and token
        const otp = Math.floor(Math.random() * 90000) + 100000;
        const token = crypto.randomBytes(32).toString('hex');

        findedUser.otp.otp = otp;
        findedUser.otp.sendTime = new Date().getTime() + 1 * 60 * 1000; // OTP expiration time
        findedUser.otp.token = token;

        await findedUser.save();

        // Send the OTP email
        await sendMail(otp, formattedEmail);

        return res.status(200).json({
            message: 'Please check email for OTP',
            status: true,
            token,
        });

    } catch (error) {
        console.error('Error in forgetPassword:', error);
        return res.status(500).json({ message: 'Internal server error', status: false });
    }
};

module.exports = forgetPassword;
