import express from 'express';
import Recipe from '../models/Recipe.js';
import { getNutritionFromSpoonacular } from '../controllers/spoonacular.js';
import { verifyToken } from '../controllers/middleware.js';

const router = express.Router();

// POST /api/recipes — add a new recipe
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, ingredients } = req.body;

    // Get nutrition info from Spoonacular
    const nutrition = await getNutritionFromSpoonacular(title, ingredients);

    const recipe = new Recipe({
      ...req.body,
      createdBy: req.userId,
      nutrition 
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.error("Spoonacular error:", err.message);
    res.status(400).json({ error: err.message });
  }
});



// GET /api/recipes — get all recipes
router.get('/', verifyToken, async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.userId });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get single recipe
// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// PUT /api/recipes/:id
router.put('/:id', async (req, res) => {
    try {
      const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ error: 'Recipe not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE /api/recipes/:id
router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Recipe.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Recipe not found' });
      res.json({ message: 'Recipe deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

export default router;
