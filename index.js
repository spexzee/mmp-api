import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './models/db.js';
import userRoutes from './routes/user.route.js';
import otpRoute from './routes/otp.route.js'

const app = express();

// Middleware
app.use(cors(
    {
        origin: '*',
        methods: ["POST", "GET" , "PUT" , "DELETE"],
        credentials: true
    }));
app.use(express.json());

// MongoDB Connection
connectDB()

// Routes
app.get('/', (req, res) => {
  res.send('welcome to Mentorship Matching Platform');
});

app.use('/api/auth', userRoutes);
app.use('/otp', otpRoute);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
