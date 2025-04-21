import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export async function getNutritionFromSpoonacular(title, ingredients) {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    console.log("🔑 Spoonacular API Key:", apiKey);
    console.log("📤 Sending to Spoonacular:", { title, ingredients });
  
    const response = await fetch(`https://api.spoonacular.com/recipes/analyze?apiKey=${apiKey}&includeNutrition=true`, {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, ingredients })
    });
  
    const text = await response.text();
    console.log("📥 Spoonacular response:", response.status, text);
  
    if (!response.ok) {
      throw new Error(`Spoonacular error ${response.status}: ${text}`);
    }
  
    const data = JSON.parse(text);
    const nutrients = data.nutrition?.nutrients || [];
    const get = (name) => nutrients.find(n => n.name === name)?.amount || 0;
  
    return {
      calories: get("Calories"),
      fat: get("Fat") + " g",
      protein: get("Protein") + " g",
      carbs: get("Carbohydrates") + " g"
    };
  }
  