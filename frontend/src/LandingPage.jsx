function LandingPage({ onChoose }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#f7f6f2",
      display: "flex", alignItems: "center",
      justifyContent: "center", flexDirection: "column"
    }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, color: "#1a5c38" }}>
          Local<span style={{ color: "#c98a12" }}>Mart</span>
        </h1>
        <p style={{ color: "#7a7870", fontSize: 16, marginTop: 8 }}>
          Meerut's Favourite Local Store 🛍️
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", gap: 24 }}>

        {/* Shopper Card */}
        <div
          onClick={() => onChoose("shopper")}
          style={{
            background: "#fff", borderRadius: 16, padding: 40,
            width: 240, textAlign: "center", cursor: "pointer",
            border: "2px solid #e8e5de",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            transition: "all 0.2s"
          }}
          onMouseOver={e => {
            e.currentTarget.style.border = "2px solid #1a5c38";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.border = "2px solid #e8e5de";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>🛒</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#1a1a18" }}>
            I'm a Shopper
          </h2>
          <p style={{ fontSize: 13, color: "#7a7870", marginBottom: 24 }}>
            Browse products and place orders
          </p>
          <button style={{
            width: "100%", background: "#1a5c38", color: "#fff",
            border: "none", borderRadius: 8, padding: "11px 0",
            fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>
            Continue Shopping →
          </button>
        </div>

        {/* Admin Card */}
        <div
          onClick={() => onChoose("admin")}
          style={{
            background: "#fff", borderRadius: 16, padding: 40,
            width: 240, textAlign: "center", cursor: "pointer",
            border: "2px solid #e8e5de",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            transition: "all 0.2s"
          }}
          onMouseOver={e => {
            e.currentTarget.style.border = "2px solid #c98a12";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.border = "2px solid #e8e5de";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>⚙️</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#1a1a18" }}>
            I'm an Admin
          </h2>
          <p style={{ fontSize: 13, color: "#7a7870", marginBottom: 24 }}>
            Manage products and orders
          </p>
          <button style={{
            width: "100%", background: "#c98a12", color: "#fff",
            border: "none", borderRadius: 8, padding: "11px 0",
            fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>
            Admin Login →
          </button>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;