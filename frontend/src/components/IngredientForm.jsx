import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function IngredientForm({ ingredients, setIngredients }) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
    }
    setInput("");
  };

  const remove = (item) => setIngredients(ingredients.filter((i) => i !== item));

  return (
    <div>
      <h3 style={{ marginBottom: "0.75rem", color: "#374151", fontWeight: 600 }}>
        Ingredients You Have
      </h3>

      <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="e.g. chicken, spinach, garlic..."
          style={{
            flex: 1, padding: "0.6rem 1rem", border: "1.5px solid #e5e7eb",
            borderRadius: 8, fontSize: "0.95rem", outline: "none"
          }}
        />
        <button onClick={add} style={{
          background: "#f97316", color: "#fff", border: "none",
          borderRadius: 8, padding: "0.6rem 1rem", cursor: "pointer"
        }}>
          <Plus size={20} />
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {ingredients.map((item) => (
          <span key={item} style={{
            display: "flex", alignItems: "center", gap: 4,
            background: "#fff7ed", border: "1px solid #fed7aa",
            borderRadius: 20, padding: "0.3rem 0.75rem",
            fontSize: "0.85rem", color: "#c2410c", fontWeight: 500
          }}>
            {item}
            <X size={14} style={{ cursor: "pointer" }} onClick={() => remove(item)} />
          </span>
        ))}
      </div>
    </div>
  );
}