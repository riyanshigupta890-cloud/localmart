function Header({ cartCount, onCartClick, onBack }) {
  return (
    <header style={{
      background: "#fff", borderBottom: "1px solid #e8e5de",
      padding: "0 28px", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 64,
      position: "sticky", top: 0, zIndex: 40,
      boxShadow: "0 1px 8px rgba(0,0,0,0.06)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: "#1a5c38" }}>
          Local<span style={{ color: "#c98a12" }}>Mart</span>
        </span>
        <button onClick={onBack} style={{
          background: "none", border: "none",
          color: "#7a7870", fontSize: 13,
          cursor: "pointer", fontWeight: 500
        }}>
          ← Switch Role
        </button>
      </div>

      <button onClick={onCartClick} style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#1a5c38", color: "#fff", border: "none",
        borderRadius: 50, padding: "8px 20px", fontSize: 14,
        fontWeight: 500, cursor: "pointer"
      }}>
        🛒 Cart
        {cartCount > 0 && (
          <span style={{
            background: "#c98a12", color: "#fff", borderRadius: "50%",
            width: 22, height: 22, fontSize: 11, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}

export default Header;