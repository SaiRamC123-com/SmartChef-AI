const { generateRecipes } = require("../services/groqService");
const { db } = require("../config/firebaseAdmin");

// POST /api/recipes/generate
const generateRecipesHandler = async (req, res) => {
  try {
    const { ingredients, goal, servings, userId } = req.body;

    if (!ingredients || !ingredients.length) {
      return res.status(400).json({ error: "Ingredients are required" });
    }

    const result = await generateRecipes(ingredients, goal || "balanced", servings);

    // Save to Firestore if user is logged in
    if (userId) {
      const batch = db.batch();
      result.recipes.forEach((recipe) => {
        const ref = db
          .collection("users")
          .doc(userId)
          .collection("generatedRecipes")
          .doc(recipe.id || Date.now().toString());
        batch.set(ref, { ...recipe, createdAt: new Date() });
      });
      await batch.commit();
    }

    res.json({ success: true, ...result });
  } catch (err) {
    console.error("Recipe generation error:", err);
    res.status(500).json({ error: "Failed to generate recipes" });
  }
};

// GET /api/recipes/saved/:userId
const getSavedRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("savedRecipes")
      .orderBy("savedAt", "desc")
      .limit(20)
      .get();

    const recipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, recipes });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch saved recipes" });
  }
};

// POST /api/recipes/save
const saveRecipe = async (req, res) => {
  try {
    const { userId, recipe } = req.body;
    await db
      .collection("users")
      .doc(userId)
      .collection("savedRecipes")
      .doc(recipe.id)
      .set({ ...recipe, savedAt: new Date() });

    res.json({ success: true, message: "Recipe saved!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save recipe" });
  }
};

// DELETE /api/recipes/saved/:userId/:recipeId
const deleteRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    await db
      .collection("users")
      .doc(userId)
      .collection("savedRecipes")
      .doc(recipeId)
      .delete();

    res.json({ success: true, message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};

module.exports = { generateRecipesHandler, getSavedRecipes, saveRecipe, deleteRecipe };