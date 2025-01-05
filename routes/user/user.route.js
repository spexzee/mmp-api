import express from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user/user.model.js';
import jwt from 'jsonwebtoken'

const router = express.Router();

// Create User (Sign Up)
router.post('/createuser', async (req, res) => {
    try {
        const { userName , email, password,firstName ,lastName} = req.body;
        // Check if email and userName already exists in a single query
        const existingUser = await User.findOne({ $or: [{ email:email }, { userName:userName }] });
        if (existingUser) {
            return res.status(400).json({ message: existingUser.email === email ? 'Email already registered' : 'UserName already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        let FName='';
        let LName='';
        if(firstName===undefined|null && lastName===undefined|null){
            FName=userName;
            LName=userName;
        }
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
            firstName:FName,
            lastName:LName
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser ,status:200});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get User by ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Find user by email or username
        let user;
        if (email) {
            user = await User.findOne({ email });
        } else if (userName) {
            user = await User.findOne({ userName });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });

        res.status(200).json({ message: 'Login successful!', user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;