import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  ingredients: [String],
  steps: String,
  category: String,
  cookTime: Number,
  imageUrl: String,
  nutrition: {
    calories: Number,
    fat: String,
    protein: String,
    carbs: String
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Recipe', recipeSchema);
