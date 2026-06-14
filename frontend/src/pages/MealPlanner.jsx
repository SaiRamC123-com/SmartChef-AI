import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { generateMealPlan } from "../services/aiService";
import LoadingSpinner from "../components/LoadingSpinner";
import GoalSelector from "../components/GoalSelector";
import { CalendarDays, Sparkles } from "lucide-react";

export default function MealPlanner() {
  const { user } = useAuth();
  const [goal, setGoal] = useState("balanced");
  const [preferences, setPreferences] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateMealPlan(goal, preferences, 7, user?.uid);
      setPlan(result.mealPlan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
      <h2 style={{ fontWeight: 800, color: "#1f2937", display: "flex", alignItems: "center", gap: 8 }}>
        <CalendarDays color="#f97316" /> Weekly Meal Planner
      </h2>

      <div style={{ background: "#fff", borderRadius: 14, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "2rem" }}>
        <GoalSelector selected={goal} onSelect={setGoal} />

        <div style={{ marginTop: "1rem" }}>
          <label style={{ fontWeight: 600, color: "#374151" }}>Dietary Restrictions / Preferences</label>
          <input
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="e.g. no gluten, dairy-free, nut allergy..."
            style={{ width: "100%", marginTop: "0.5rem", padding: "0.6rem 1rem", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: "0.95rem", boxSizing: "border-box" }}
          />
        </div>

        <button onClick={handleGenerate} disabled={loading} style={{
          marginTop: "1.25rem", background: loading ? "#d1d5db" : "#f97316",
          color: "#fff", border: "none", borderRadius: 10, padding: "0.8rem 2rem",
          fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8
        }}>
          <Sparkles size={18} /> {loading ? "Planning..." : "Generate 7-Day Plan"}
        </button>
      </div>

      {loading && <LoadingSpinner text="Building your personalized meal plan..." />}

      {!loading && plan && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          {plan.map((day) => (
            <div key={day.day} style={{ background: "#fff", borderRadius: 12, padding: "1rem", border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin: "0 0 0.75rem", color: "#f97316", fontWeight: 700 }}>{day.day}</h3>
              {["breakfast", "lunch", "dinner", "snack"].map((meal) => (
                <div key={meal} style={{ marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "#9ca3af", fontWeight: 600 }}>{meal}</span>
                  <p style={{ margin: "0.1rem 0 0", fontSize: "0.88rem", color: "#374151", fontWeight: 500 }}>{day[meal]?.name}</p>
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{day[meal]?.calories} kcal · {day[meal]?.prepTime}</span>
                </div>
              ))}
              <div style={{ marginTop: "0.75rem", borderTop: "1px solid #f0f0f0", paddingTop: "0.5rem", fontSize: "0.82rem", color: "#f97316", fontWeight: 700 }}>
                Total: {day.totalCalories} kcal
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}