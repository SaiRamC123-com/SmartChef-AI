import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getSavedRecipes, deleteRecipe } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Bookmark } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getSavedRecipes(user.uid).then((r) => { setRecipes(r); setLoading(false); });
    }
  }, [user]);

  const handleDelete = async (recipe) => {
    await deleteRecipe(user.uid, recipe.id);
    setRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
  };

  if (loading) return <LoadingSpinner text="Loading your saved recipes..." />;

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem" }}>
      <h2 style={{ fontWeight: 800, color: "#1f2937", display: "flex", alignItems: "center", gap: 8 }}>
        <Bookmark color="#f97316" /> Saved Recipes
      </h2>

      {recipes.length === 0 ? (
        <div style={{ textAlign: "center", color: "#6b7280", padding: "4rem" }}>
          <p>No saved recipes yet. Go generate some on the home page!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} onSave={handleDelete} saved={true} />
          ))}
        </div>
      )}
    </div>
  );
}