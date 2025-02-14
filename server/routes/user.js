const express = require('express');
const register = require('../controller/register');
const login = require('../controller/login');
const forgetPassword = require("../controller/forgetPassword");
const verifyOTP = require("../controller/verifyOTP");
const getOtpTime = require('../controller/getOtpTime');
const updatePassword = require('../controller/updatePassword');
const googleLogin = require('../controller/googleLogin');
const updateProfile = require('../controller/updateProfile');
const getCropsByStateSeason = require('../controller/getCropsByStateSeason');
const paymentController = require('../controller/paymentController');
const payment = require('../controller/payment');
const bagSection = require('../controller/bagSection')
const router = express.Router();

// Corrected POST routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgetPassword', forgetPassword);
router.post('/verifyOTP', verifyOTP);
router.post('/getOtpTime', getOtpTime);
router.post('/updatePassword', updatePassword);
router.post('/googleLogin', googleLogin);
router.post('/updateProfile',updateProfile);
router.post('/getCropsByStateSeason',getCropsByStateSeason);
router.post('/paymentController',paymentController);
router.post('/payment',payment);
router.post('/order',bagSection);

module.exports = router;
