import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => { await logout(); navigate("/"); };

  if (!user) return <p style={{ padding: "2rem", color: "#6b7280" }}>Please log in.</p>;

  return (
    <div style={{ maxWidth: 480, margin: "3rem auto", padding: "0 1rem" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", textAlign: "center" }}>
        {user.photoURL ? (
          <img src={user.photoURL} alt="Avatar" style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: "1rem" }} />
        ) : (
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <User size={36} color="#f97316" />
          </div>
        )}
        <h2 style={{ margin: 0, color: "#1f2937" }}>{user.displayName || "Chef"}</h2>
        <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>{user.email}</p>

        <button onClick={handleLogout} style={{
          marginTop: "1.5rem", background: "#fef2f2", color: "#ef4444",
          border: "1px solid #fecaca", borderRadius: 10,
          padding: "0.7rem 2rem", fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8, margin: "1.5rem auto 0"
        }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}