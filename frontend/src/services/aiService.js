import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const generateRecipes = async (ingredients, goal, servings, userId) => {
  const { data } = await axios.post(`${API}/api/recipes/generate`, {
    ingredients,
    goal,
    servings,
    userId,
  });
  return data;
};

export const generateMealPlan = async (goal, preferences, days, userId) => {
  const { data } = await axios.post(`${API}/api/meals/plan`, {
    goal,
    preferences,
    days,
    userId,
  });
  return data;
};