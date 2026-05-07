import { useState } from "react";

function AdminLogin({ onLogin, onBack  }) {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(null);

  const handleLogin = () => {
    if (password === "localmart_admin_2024") {
      localStorage.setItem("adminAuth", password);
      onLogin(password);
    } else {
      setError("Wrong password!");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f7f6f2",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: 40,
        width: 380, boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a5c38" }}>
            Local<span style={{ color: "#c98a12" }}>Mart</span>
          </h1>
          <p style={{ color: "#7a7870", fontSize: 14, marginTop: 6 }}>
            Admin Panel
          </p>
        </div>

        <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>
          Admin Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="Enter admin password"
          style={{
            width: "100%", padding: "11px 14px",
            border: "1.5px solid #e8e5de", borderRadius: 8,
            fontSize: 14, marginBottom: 16, boxSizing: "border-box"
          }}
        />

        {error && (
          <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 12 }}>
            ⚠️ {error}
          </p>
        )}
<button onClick={onBack} style={{
  background: "none", border: "none",
  color: "#7a7870", fontSize: 13,
  cursor: "pointer", marginBottom: 16,
  display: "block"
}}>
  ← Back to Home
</button>
        <button
          onClick={handleLogin}
          style={{
            width: "100%", background: "#1a5c38", color: "#fff",
            border: "none", borderRadius: 8, padding: "12px 0",
            fontSize: 15, fontWeight: 600, cursor: "pointer"
          }}
        >
          Login to Admin Panel
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;