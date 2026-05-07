function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{
        width: 48, height: 48, border: "5px solid #e0e0e0",
        borderTop: "5px solid #1a5c38", borderRadius: "50%",
        animation: "spin 0.8s linear infinite", margin: "0 auto 16px"
      }} />
      <p style={{ color: "#7a7870", fontSize: 15 }}>Loading products...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default Loader;