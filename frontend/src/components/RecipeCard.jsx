import { useState } from "react";
import { Clock, ChefHat, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Timer } from "lucide-react";
import NutritionCard from "./NutritionCard";

export default function RecipeCard({ recipe, onSave, saved = false }) {
  const [expanded, setExpanded] = useState(false);
  const [cookingMode, setCookingMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setTimerRunning(true);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(interval); setTimerRunning(false); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const steps = recipe.steps || [];

  if (cookingMode) {
    const step = steps[currentStep];
    return (
      <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 14, padding: "1.25rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ margin: 0, color: "#1f2937", fontWeight: 700 }}>👨‍🍳 {recipe.name}</h3>
          <button onClick={() => setCookingMode(false)} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, padding: "0.4rem 0.8rem", cursor: "pointer", color: "#374151" }}>✕ Exit</button>
        </div>

        {/* Progress bar */}
        <div style={{ background: "#f3f4f6", borderRadius: 99, height: 8, marginBottom: "1rem" }}>
          <div style={{ background: "#f97316", borderRadius: 99, height: 8, width: `${((currentStep + 1) / steps.length) * 100}%`, transition: "width 0.3s" }} />
        </div>
        <p style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "1rem" }}>Step {currentStep + 1} of {steps.length}</p>

        {/* Current step */}
        <div style={{ background: "#fff7ed", border: "2px solid #f97316", borderRadius: 12, padding: "1rem", marginBottom: "1rem" }}>
          <h4 style={{ color: "#f97316", margin: "0 0 0.5rem" }}>Step {step.stepNumber}: {step.title}</h4>
          <p style={{ color: "#1f2937", fontSize: "1rem", lineHeight: 1.6, margin: "0 0 0.75rem" }}>{step.instruction}</p>
          {step.tip && <p style={{ color: "#6b7280", fontSize: "0.85rem", margin: 0 }}>💡 {step.tip}</p>}
        </div>

        {/* Timer */}
        {step.duration && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{ background: "#1f2937", color: "#fff", borderRadius: 10, padding: "0.5rem 1rem", fontSize: "1.5rem", fontWeight: 700, fontFamily: "monospace" }}>
              {timeLeft !== null ? formatTime(timeLeft) : `${step.duration}:00`}
            </div>
            <button onClick={() => startTimer(step.duration)} disabled={timerRunning}
              style={{ background: timerRunning ? "#9ca3af" : "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", cursor: timerRunning ? "default" : "pointer", fontWeight: 600 }}>
              {timerRunning ? "Running..." : "▶ Start Timer"}
            </button>
            {timeLeft === 0 && <span style={{ color: "#16a34a", fontWeight: 700 }}>✅ Done!</span>}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={() => { setCurrentStep(s => s - 1); setTimeLeft(null); setTimerRunning(false); }}
            disabled={currentStep === 0}
            style={{ flex: 1, background: currentStep === 0 ? "#f3f4f6" : "#1f2937", color: currentStep === 0 ? "#9ca3af" : "#fff", border: "none", borderRadius: 8, padding: "0.65rem", cursor: currentStep === 0 ? "default" : "pointer", fontWeight: 600 }}>
            ← Previous
          </button>
          <button onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(s => s + 1); setTimeLeft(null); setTimerRunning(false); } else setCookingMode(false); }}
            style={{ flex: 1, background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "0.65rem", cursor: "pointer", fontWeight: 600 }}>
            {currentStep === steps.length - 1 ? "🎉 Finish!" : "Next →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 14, padding: "1.25rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#1f2937", fontWeight: 700 }}>{recipe.name}</h3>
          <p style={{ margin: "0.35rem 0 0", fontSize: "0.85rem", color: "#6b7280" }}>{recipe.description}</p>
        </div>
        <button onClick={() => onSave?.(recipe)} style={{ background: "none", border: "none", cursor: "pointer", color: "#f97316" }}>
          {saved ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
        </button>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem" }}>
        <span style={tagStyle}><Clock size={13} /> {recipe.cookTime}</span>
        <span style={tagStyle}><ChefHat size={13} /> {recipe.difficulty}</span>
        <span style={tagStyle}>👥 {recipe.servings} servings</span>
      </div>

      {recipe.nutrition && <NutritionCard nutrition={recipe.nutrition} />}

      {/* Ingredients */}
      {recipe.ingredients && (
        <div style={{ marginTop: "0.75rem" }}>
          <p style={{ fontWeight: 600, color: "#374151", fontSize: "0.9rem", margin: "0 0 0.4rem" }}>🛒 Ingredients:</p>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#374151", fontSize: "0.85rem" }}>
            {recipe.ingredients.map((ing, i) => (
              <li key={i} style={{ marginBottom: "0.2rem" }}>
                <strong>{ing.amount}</strong> {ing.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
        <button onClick={() => setExpanded(!expanded)}
          style={{ flex: 1, background: "none", border: "1px solid #e5e7eb", borderRadius: 8, padding: "0.4rem 0.9rem", cursor: "pointer", color: "#374151", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          {expanded ? <><ChevronUp size={15} /> Hide Steps</> : <><ChevronDown size={15} /> View Steps</>}
        </button>
        {steps.length > 0 && (
          <button onClick={() => { setCookingMode(true); setCurrentStep(0); setTimeLeft(null); }}
            style={{ flex: 1, background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "0.4rem 0.9rem", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
            👨‍🍳 Start Cooking
          </button>
        )}
      </div>

      {expanded && steps.length > 0 && (
        <ol style={{ marginTop: "0.75rem", paddingLeft: "1.2rem", color: "#374151", fontSize: "0.9rem" }}>
          {steps.map((step, i) => (
            <li key={i} style={{ marginBottom: "0.75rem" }}>
              <strong>{step.title}</strong>
              <p style={{ margin: "0.2rem 0", lineHeight: 1.5 }}>{step.instruction}</p>
              {step.tip && <p style={{ color: "#6b7280", fontSize: "0.8rem", margin: 0 }}>💡 {step.tip}</p>}
              {step.duration && <span style={{ color: "#f97316", fontSize: "0.8rem" }}>⏱️ {step.duration} mins</span>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

const tagStyle = {
  display: "flex", alignItems: "center", gap: 4,
  background: "#f3f4f6", borderRadius: 20,
  padding: "0.25rem 0.65rem", fontSize: "0.78rem", color: "#4b5563"
};