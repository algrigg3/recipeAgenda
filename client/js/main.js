const API_BASE = 'https://recipeagenda-backend.onrender.com/api/recipes';

export async function getAllRecipes() {
  const token = localStorage.getItem('token');

  const res = await fetch(API_BASE, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`❌ Failed to fetch recipes: ${res.status} ${errorText}`);
  }

  return res.json();
}


export async function getRecipeById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return await res.json();
}

export async function createRecipe(recipeData) {
  const token = localStorage.getItem('token');

  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(recipeData),
  });

  if (!res.ok) throw new Error('Failed to create recipe');
  return await res.json();
}


export async function updateRecipe(id, updatedData) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error('Failed to update recipe');
  return await res.json();
}


export async function deleteRecipe(id) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Failed to delete recipe');
  return await res.json();
}
