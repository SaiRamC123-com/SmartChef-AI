import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getSavedRecipes = async (userId) => {
  const { data } = await axios.get(`${API}/api/recipes/saved/${userId}`);
  return data.recipes;
};

export const saveRecipe = async (userId, recipe) => {
  const { data } = await axios.post(`${API}/api/recipes/save`, { userId, recipe });
  return data;
};

export const deleteRecipe = async (userId, recipeId) => {
  const { data } = await axios.delete(`${API}/api/recipes/saved/${userId}/${recipeId}`);
  return data;
};

export const getMealPlans = async (userId) => {
  const { data } = await axios.get(`${API}/api/meals/plans/${userId}`);
  return data.plans;
};