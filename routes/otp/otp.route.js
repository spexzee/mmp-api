import express from 'express';
import { generateOtp, sendOtpEmail } from '../../utils/otp/otpMailer.js';
import { storeOtp, verifyOtp } from '../../utils/otp/otpStorage.js';


const router = express.Router();
let success = false;

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({success, message: "Email is required." });
  }

  const otp = generateOtp();

  const sent = await sendOtpEmail(email, otp);

  if (sent) {
    await storeOtp(email, otp);
    res.status(200).json({
      success:true,
      message: "OTP sent successfully.",
    });
  } else {
    res.status(500).json({ success , message: "Failed to send OTP. Please try again." });
  }
});

router.post("/verify-otp", async (req, res) => {

  const { email, otp } = req.body.data;

  if (!email || !otp) {
    return res.status(400).json({ success ,message: "Email and OTP are required." });
  }

  const result = await verifyOtp(email, otp);

  if (result.valid) {
    res.status(200).json({success:true, message: result.message });
  } else {
    res.status(400).json({success, message: result.message });
  }
});

export default router;
