export default function LoadingSpinner({ text = "Cooking up something..." }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem" }}>
      <div style={{
        width: 48, height: 48,
        border: "4px solid #f3f4f6",
        borderTop: "4px solid #f97316",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <p style={{ marginTop: "1rem", color: "#6b7280", fontSize: "0.95rem" }}>{text}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}