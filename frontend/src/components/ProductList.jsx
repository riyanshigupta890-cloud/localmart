import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#7a7870" }}>
        <p style={{ fontSize: 48 }}>🔍</p>
        <p style={{ fontSize: 16 }}>No products found</p>
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 20, padding: "20px 0"
    }}>
      {products.map((p) => (
        <ProductCard key={p._id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;