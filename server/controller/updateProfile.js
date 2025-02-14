const User = require('../models/User');
const bcrypt = require('bcrypt');
const joi = require('joi');

const updateProfile = async (req, res, next) => {
    const { error: validationError } = validateUser(req.body);
    const { name, email, password } = req.body;

    try {
        if (validationError) {
            const error = new Error(validationError.details[0].message);
            error.statusCode = 400;
            throw error;
        }

        const formattedEmail = email.toLowerCase();

        // Check if user exists with the given email
        const existingUser = await User.findOne({ email: formattedEmail });
        if (!existingUser) {
            // If the email doesn't exist, return an error
            const error = new Error("User with this email doesn't exist");
            error.statusCode = 400;
            throw error;
        }

        // Update user information
        existingUser.name = name.toLowerCase();
        existingUser.password = await bcrypt.hash(password, 10);

        await existingUser.save();

        res.status(200).json({ message: "User updated Successfully", status: true });
    } catch (error) {
        next(error);
    }
};

module.exports = updateProfile;

function validateUser(data) {
    const userSchema = joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().required(),
        password: joi.string().min(6).max(12).required(),
    });
    return userSchema.validate(data);
}
