import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import recipeRoutes from '../server/routes/Recipes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Recipe Agenda backend is running!');
});
app.use('/api/recipes', recipeRoutes);


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('❌ MongoDB connection error:', error));
