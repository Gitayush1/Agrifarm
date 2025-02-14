const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error'); // Ensure the import path is correct for CommonJS

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    // If no token is found, return an error
    if (!token) return next(errorHandler(401, 'You are not authenticated!'));

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        // If token is valid, add the user to the request object
        req.user = user;
        next();
    });
};
