const { generateMealPlan } = require("../services/groqService");
const { db } = require("../config/firebaseAdmin");

// POST /api/meals/plan
const generatePlan = async (req, res) => {
  try {
    const { goal, preferences, days, userId } = req.body;

    const result = await generateMealPlan(goal || "balanced", preferences, days || 7);

    if (userId) {
      await db
        .collection("users")
        .doc(userId)
        .collection("mealPlans")
        .add({ ...result, createdAt: new Date(), goal });
    }

    res.json({ success: true, ...result });
  } catch (err) {
    console.error("Meal plan error:", err);
    res.status(500).json({ error: "Failed to generate meal plan" });
  }
};

// GET /api/meals/plans/:userId
const getMealPlans = async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("mealPlans")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    const plans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, plans });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meal plans" });
  }
};

module.exports = { generatePlan, getMealPlans };