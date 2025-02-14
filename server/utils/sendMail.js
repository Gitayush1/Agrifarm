const nodemailer = require('nodemailer');

const sendMail = async (otp, email) => {
    try {
        const transport = nodemailer.createTransport({
            service: 'GMAIL',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "🌱 Your Farmwise Password Reset OTP is Here! 🚜",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
                        <h1>🌾 Farmwise</h1>
                        <h2 style="margin: 0;">Password Reset OTP</h2>
                    </div>
                    <div style="padding: 20px; color: #333;">
                        <p>Hi there! 👋</p>
                        <p>We received a request to reset your password. Use the OTP below to proceed:</p>
                        <div style="font-size: 24px; font-weight: bold; color: #4CAF50; margin: 20px 0; text-align: center;">
                            🔒 <span>${otp}</span> 🔒
                        </div>
                        <p>This OTP is valid for a limited time, so make sure to enter it soon!</p>
                        <p>If you didn't request this, please ignore this email or reach out to our support team.</p>
                        <br>
                        <p>🌱 Happy Farming,<br> The Farmwise Team 🚜</p>
                    </div>
                    <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 12px; color: #888;">
                        <p>Need help? Contact us at farmwiseconnect@gmail.com</p>
                    </div>
                </div>
            `
        };
        

        // Using await to handle errors effectively
        await transport.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error.message);
        throw new Error('Failed to send email');
    }
};

module.exports = sendMail;
