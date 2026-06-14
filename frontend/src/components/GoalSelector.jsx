const GOALS = [
  { id: "weight-loss", label: "🥗 Weight Loss", desc: "Low calorie, high fiber" },
  { id: "muscle-gain", label: "💪 Muscle Gain", desc: "High protein meals" },
  { id: "balanced", label: "⚖️ Balanced", desc: "Nutritionally complete" },
  { id: "keto", label: "🥑 Keto", desc: "Low carb, high fat" },
  { id: "vegan", label: "🌱 Vegan", desc: "100% plant-based" },
  { id: "quick-meals", label: "⚡ Quick Meals", desc: "Ready in 20 mins" },
];

export default function GoalSelector({ selected, onSelect }) {
  return (
    <div>
      <h3 style={{ marginBottom: "0.75rem", color: "#374151", fontWeight: 600 }}>
        Your Goal
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
        {GOALS.map((g) => (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            style={{
              padding: "0.75rem",
              border: selected === g.id ? "2px solid #f97316" : "2px solid #e5e7eb",
              borderRadius: 10,
              background: selected === g.id ? "#fff7ed" : "#fff",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1f2937" }}>{g.label}</div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: 2 }}>{g.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}