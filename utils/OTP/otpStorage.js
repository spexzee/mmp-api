
import mongoose from "mongoose";

// OTP Schema
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

const OtpModel = mongoose.model("Otp", otpSchema);

// Function to store OTP in MongoDB
const storeOtp = async (email, otp) => {
  try {
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now

    // Remove any existing OTP for the email
    await OtpModel.deleteOne({ email });

    // Store new OTP
    await OtpModel.create({ email, otp, expiresAt });
  } catch (error) {
    console.error("Error storing OTP:", error);
  }
};

// Function to verify OTP
const verifyOtp = async (email, otp) => {
  try {
    const record = await OtpModel.findOne({ email });

    if (!record) return { valid: false, message: "OTP not found." };

    if (record.otp !== otp) {
      return { valid: false, message: "Invalid OTP." };
    }

    // OTP is valid, remove it 
    await OtpModel.deleteOne({ email });
    return { valid: true, message: "OTP verified successfully." };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { valid: false, message: "An error occurred." };
  }
};

export { storeOtp, verifyOtp };
