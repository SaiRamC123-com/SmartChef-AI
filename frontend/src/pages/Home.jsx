import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import IngredientForm from "../components/IngredientForm";
import GoalSelector from "../components/GoalSelector";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { generateRecipes } from "../services/aiService";
import { saveRecipe } from "../services/recipeService";
import { Sparkles } from "lucide-react";

export default function Home() {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [goal, setGoal] = useState("balanced");
  const [servings, setServings] = useState(2);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!ingredients.length) return setError("Add at least one ingredient!");
    setError("");
    setLoading(true);
    try {
      const result = await generateRecipes(ingredients, goal, servings, user?.uid);
      setRecipes(result.recipes);
    } catch {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (recipe) => {
    if (!user) return loginWithGoogle();
    await saveRecipe(user.uid, recipe);
    setSavedIds((prev) => new Set([...prev, recipe.id]));
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#1f2937", margin: 0 }}>
          What's in your 🧑‍🍳 kitchen?
        </h1>
        <p style={{ color: "#6b7280", marginTop: "0.5rem", fontSize: "1.05rem" }}>
          Tell us your ingredients and goal — AI will craft perfect recipes for you.
        </p>
      </div>

      {/* Controls */}
      <div id="recipe-section" style={{
  background: "#fff", borderRadius: 16, padding: "1.5rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.07)", marginBottom: "2rem"
}}>
        <IngredientForm ingredients={ingredients} setIngredients={setIngredients} />

        <div style={{ height: "1.5rem" }} />
        <GoalSelector selected={goal} onSelect={setGoal} />

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.25rem" }}>
          <label style={{ color: "#374151", fontWeight: 500 }}>Servings:</label>
          <input
            type="number" min={1} max={10} value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            style={{ width: 70, padding: "0.4rem 0.7rem", border: "1.5px solid #e5e7eb", borderRadius: 8 }}
          />
        </div>

        {error && <p style={{ color: "#ef4444", marginTop: "0.75rem" }}>{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            marginTop: "1.25rem", width: "100%",
            background: loading ? "#d1d5db" : "#f97316",
            color: "#fff", border: "none", borderRadius: 10,
            padding: "0.85rem", fontSize: "1rem",
            fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}
        >
          <Sparkles size={18} />
          {loading ? "Generating..." : "Generate Recipes with AI"}
        </button>
      </div>

      {/* Results */}
      {loading && <LoadingSpinner text="AI is crafting your recipes..." />}

      {!loading && recipes.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSave={handleSave}
              saved={savedIds.has(recipe.id)}
            />
          ))}
        </div>
      )}
      </div>
  );
}