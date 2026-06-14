require("dotenv").config();
const express = require("express");
const cors = require("cors");

const recipeRoutes = require("./routes/recipeRoutes");
const mealRoutes = require("./routes/mealRoutes");

const app = express();

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || origin.includes('vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use("/api/recipes", recipeRoutes);
app.use("/api/meals", mealRoutes);

app.get("/health", (req, res) => res.json({ status: "SmartChef API running ✅" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🍳 SmartChef backend running on port ${PORT}`));