const API_BASE = 'http://localhost:5000/api/recipes';

export async function getAllRecipes() {
  const res = await fetch(API_BASE);
  return await res.json();
}

export async function getRecipeById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return await res.json();
}

export async function createRecipe(recipeData) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData),
  });
  return await res.json();
}

export async function updateRecipe(id, updatedData) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  return await res.json();
}

export async function deleteRecipe(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
}
