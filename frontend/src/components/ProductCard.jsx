function ProductCard({ product, onAddToCart }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div style={{
      background: "#fff", borderRadius: 12, overflow: "hidden",
      border: "1px solid #e8e5de", transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer"
    }}
      onMouseOver={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: 200, objectFit: "cover" }}
        />
        {product.badge && (
          <span style={{
            position: "absolute", top: 10, left: 10,
            background: product.badge === "Sale" ? "#fdecea" : "#e8f4ee",
            color: product.badge === "Sale" ? "#c0392b" : "#1a5c38",
            padding: "4px 10px", borderRadius: 50,
            fontSize: 11, fontWeight: 600
          }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "14px 16px" }}>
        <p style={{ fontSize: 12, color: "#7a7870", marginBottom: 4 }}>
          {product.category}
        </p>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "#1a1a18" }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <span style={{ color: "#e8a020", fontSize: 13 }}>
            {"★".repeat(Math.floor(product.rating))}
          </span>
          <span style={{ fontSize: 12, color: "#7a7870" }}>
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1a18" }}>
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: 13, color: "#7a7870", textDecoration: "line-through" }}>
              ₹{product.originalPrice}
            </span>
          )}
          {discount && (
            <span style={{ fontSize: 12, color: "#c0392b", fontWeight: 600 }}>
              {discount}% off
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          style={{
            width: "100%", background: "#1a5c38", color: "#fff",
            border: "none", borderRadius: 8, padding: "10px 0",
            fontSize: 14, fontWeight: 500, cursor: "pointer"
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;