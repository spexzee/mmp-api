import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./models/db.js";
import userRoutes from "./routes/user/user.route.js";
import forgotPassword from "./routes/forgotPassword/forgotPassword.route.js";
import otpRoute from "./routes/otp/otp.route.js";
import googleRoutes from "./routes/google-login/google.route.js";
import menuContents from "./routes/MenuItems/MenuItems.route.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("welcome to Mentorship Matching Platform");
});

app.use("/api/auth", userRoutes);
app.use("/forgotPassword", forgotPassword);
app.use("/otp", otpRoute);
app.use("/api", googleRoutes);
app.use("/MenuContensts", menuContents);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
