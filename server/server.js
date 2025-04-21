import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import recipeRoutes from '../server/routes/Recipes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Recipe Agenda backend is running!');
});
app.use('/api/recipes', recipeRoutes);

console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET);
// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('❌ MongoDB connection error:', error));
