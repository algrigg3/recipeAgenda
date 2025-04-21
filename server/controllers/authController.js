import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
    console.log('📥 SIGNUP endpoint hit');
    const { username, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ username });
      console.log('🔍 User found:', existingUser);
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      console.log('✅ User saved:', user);
  
      res.status(201).json({ message: 'Account created!' });
    } catch (err) {
      console.error('❌ Signup error:', err.message);
      res.status(500).json({ message: 'Signup failed', error: err.message });
    }
  };
  

export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log('🧪 Login attempt for:', username); // ✅ log this
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        console.log('❌ No user found');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log('❌ Password mismatch');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
      console.log('✅ Login success');
      res.json({ token, userId: user._id });
    } catch (err) {
      console.error('🔥 Login failed:', err.message);
      res.status(500).json({ message: 'Login failed', error: err.message });
    }
  };
  
