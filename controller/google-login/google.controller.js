import axios from "axios";
import { oauth2client } from "../../utils/google-login/googleConfig.js";
import User from "../../models/user/user.model.js";
import jwt from 'jsonwebtoken';
import HelperFunctions from "../../HelperFunctions/HelperFunctions.js";
import bcrypt  from 'bcrypt';

let success = false;

const googleLogin = async (req, res) => {
    try {
        const {generateSecurePassword} = HelperFunctions
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ success,message: "Authorization code is required" });
        }

        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const email = userRes.data.email.trim().toLowerCase();
        const name = userRes.data.name;
        const picture = userRes.data.picture;
        const userName = name.split(' ')[0]
        const password = generateSecurePassword()

        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

        if (!user) {
            user = await User.create({
                FullName: name,
                email,
                userName,
                password: hashedPassword,
                image: picture,
            });
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT,
        });

        return res.status(200).json({
            message: "Success",
            success:true,
            token,
            user,
        });
    } catch (error) {
        console.error("Google Login Error:", error);
        return res.status(500).json({success, message: "Internal Server Error" });
    }
};

export default googleLogin