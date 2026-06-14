import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ChefHat, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1rem 2rem", background: "#fff",
      borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 1px 8px rgba(0,0,0,0.06)"
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <ChefHat color="#f97316" size={28} />
        <span style={{ fontWeight: 700, fontSize: "1.25rem", color: "#1f2937" }}>
          Smart<span style={{ color: "#f97316" }}>Chef</span> AI
        </span>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {user ? (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/meal-planner" style={linkStyle}>Meal Planner</Link>
            <Link to="/profile" style={linkStyle}><User size={18} /></Link>
            <button onClick={handleLogout} style={btnStyle}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <button
  onClick={() => {
    const el = document.getElementById('recipe-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 400, behavior: 'smooth' });
  }}
  style={{
    background: "#f97316", color: "#fff", border: "none",
    borderRadius: 8, padding: "0.5rem 1.2rem",
    cursor: "pointer", fontWeight: 600
  }}
>
  Get Started
</button>
        )}
      </div>
    </nav>
  );
}


const linkStyle = {
  textDecoration: "none", color: "#374151",
  fontWeight: 500, fontSize: "0.95rem"
};

const btnStyle = {
  display: "flex", alignItems: "center", gap: 6,
  background: "#f97316", color: "#fff", border: "none",
  padding: "0.5rem 1rem", borderRadius: 8, cursor: "pointer",
  fontWeight: 600, fontSize: "0.9rem"
};