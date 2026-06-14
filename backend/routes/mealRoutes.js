const express = require("express");
const router = express.Router();
const {
  generateRecipesHandler,
  getSavedRecipes,
  saveRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

router.post("/generate", generateRecipesHandler);
router.get("/saved/:userId", getSavedRecipes);
router.post("/save", saveRecipe);
router.delete("/saved/:userId/:recipeId", deleteRecipe);

module.exports = router;