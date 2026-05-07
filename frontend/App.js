import { useState, useEffect } from "react";
import { getProducts } from "../services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ padding: 20 }}>Loading products...</h2>;
  if (error)   return <h2 style={{ padding: 20, color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>LocalMart 🛒</h1>
      <p>{products.length} products loaded from MongoDB!</p>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} — ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;