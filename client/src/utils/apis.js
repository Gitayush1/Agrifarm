const apis = () => {
    const local = "http://localhost:5556/";

    const list = {
        registerUser: `${local}user/register`,
        loginUser: `${local}user/login`,
        forgetUser: `${local}user/forgetPassword`,
        verifyUser: `${local}user/verifyOTP`,
        getOtpTime: `${local}user/getOtpTime`,
        updateUser: `${local}user/updatePassword`,
        googleLogin: `${local}user/googleLogin`, 
        updateProfile:`${local}user/updateProfile`,
        getCropsByStateSeason :`${local}user/getCropsByStateSeason`,
        paymentController:`${local}user/paymentController`,
        payment:`${local}user/payment`,
        bagSection:`${local}user/bagSection`,
    };

    return list;
};

export default apis;
