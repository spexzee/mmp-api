import express from 'express';
import { generateOtp, sendOtpEmail } from '../utils/OTP/otpMailer.js';
import { storeOtp, verifyOtp } from '../utils/OTP/otpStorage.js';

const router = express.Router();

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    const otp = generateOtp();

    const sent = await sendOtpEmail(email, otp);

    if (sent) {
        await storeOtp(email, otp);
        res.status(200).json({ message: "OTP sent successfully." });
    } else {
        res.status(500).json({ message: "Failed to send OTP. Please try again." });
    }
});


router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required." });
    }

    const result = await verifyOtp(email, otp);

    if (result.valid) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(400).json({ message: result.message });
    }
});

export default router;