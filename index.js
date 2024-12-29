import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB()

// Routes
app.get('/', (req, res) => {
  res.send('welcome to Mentorship Matching Platform');
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
