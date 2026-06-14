export default function NutritionCard({ nutrition }) {
  const items = [
    { label: "Calories", value: nutrition.calories, unit: "kcal", color: "#f97316" },
    { label: "Protein", value: nutrition.protein, unit: "g", color: "#3b82f6" },
    { label: "Carbs", value: nutrition.carbs, unit: "g", color: "#eab308" },
    { label: "Fat", value: nutrition.fat, unit: "g", color: "#ef4444" },
    { label: "Fiber", value: nutrition.fiber, unit: "g", color: "#22c55e" },
  ];

  return (
    <div style={{
      background: "#f9fafb", borderRadius: 10, padding: "1rem",
      display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem",
      marginTop: "0.75rem"
    }}>
      {items.map((n) => (
        <div key={n.label} style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: n.color }}>
            {n.value}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>{n.unit}</div>
          <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{n.label}</div>
        </div>
      ))}
    </div>
  );
}