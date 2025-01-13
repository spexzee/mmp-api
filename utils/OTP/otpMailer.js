import { config } from "dotenv";
import nodemailer from "nodemailer";

config();

const transporter = nodemailer.createTransport({
    service: "Gmail", // Or another SMTP service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send OTP
const sendOtpEmail = async (toEmail, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. It is valid for 3 minutes.`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};


const sendMessage = async (toEmail, message, subject = "Notification") => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

const otpStorage = new Map(); // Key-value store for OTP

const storeOtp = (email, otp) => {
    otpStorage.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });
};


export { sendOtpEmail, generateOtp, storeOtp , sendMessage };
