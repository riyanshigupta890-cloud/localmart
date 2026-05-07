import { useState, useEffect, useMemo } from "react";
import { getProducts } from "./services/api";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Loader from "./components/Loader";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import OrderTracking from "./components/OrderTracking";
import SupportChat from "./components/SupportChat";

const CATEGORIES = ["All", "Groceries", "Electronics", "Clothing", "Home & Kitchen", "Beauty"];

function App({ onBack }) {
  const [products, setProducts]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [category, setCategory]           = useState("All");
  const [search, setSearch]               = useState("");
  const [sortBy, setSortBy]               = useState("popular");
  const [cart, setCart]                   = useState([]);
  const [cartOpen, setCartOpen]           = useState(false);
  const [checkoutOpen, setCheckoutOpen]   = useState(false);
  const [successOrder, setSuccessOrder]   = useState(null);
  const [trackingOpen, setTrackingOpen]   = useState(false);
  const [chatOpen, setChatOpen]           = useState(false);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return products
      .filter(p => category === "All" || p.category === category)
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "price-asc")  return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating")     return b.rating - a.rating;
        return b.reviews - a.reviews;
      });
  }, [products, category, search, sortBy]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === product._id);
      return existing
        ? prev.map(i => i._id === product._id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, change) => {
    setCart(prev =>
      prev.map(i => i._id === id
        ? { ...i, qty: Math.max(1, i.qty + change) }
        : i
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i._id !== id));
  };

  const handleOrderSuccess = (order) => {
    setSuccessOrder(order);
    setCheckoutOpen(false);
    setCartOpen(false);
    setCart([]);
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  if (loading) return <Loader />;
  if (error)   return <h2 style={{ padding: 20, color: "red" }}>{error}</h2>;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f2" }}>
     <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} onBack={onBack} />

      {cartOpen && (
        <Cart
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
      )}

      {checkoutOpen && (
        <Checkout
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onSuccess={handleOrderSuccess}
        />
      )}

      {successOrder && (
        <OrderSuccess
          order={successOrder}
          onClose={() => setSuccessOrder(null)}
        />
      )}

      {trackingOpen && (
        <OrderTracking onClose={() => setTrackingOpen(false)} />
      )}

      {chatOpen && (
        <SupportChat onClose={() => setChatOpen(false)} />
      )}

      {/* Floating Buttons */}
      <div style={{
        position: "fixed", bottom: 24, right: 24,
        display: "flex", flexDirection: "column", gap: 12, zIndex: 40
      }}>
        <button
          onClick={() => setTrackingOpen(true)}
          style={{
            background: "#1a5799", color: "#fff",
            border: "none", borderRadius: 50,
            padding: "12px 20px", fontSize: 13,
            fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}
        >
          📦 Track Order
        </button>

        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            background: "#1a5c38", color: "#fff",
            border: "none", borderRadius: 50,
            padding: "12px 20px", fontSize: 13,
            fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}
        >
          💬 Support
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>

        {/* Search & Sort */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{
              flex: 1, padding: "10px 16px",
              border: "1.5px solid #e8e5de",
              borderRadius: 50, fontSize: 14, background: "#fff"
            }}
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: "10px 16px", border: "1.5px solid #e8e5de",
              borderRadius: 50, fontSize: 14, background: "#fff", cursor: "pointer"
            }}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "8px 18px", borderRadius: 50, fontSize: 13,
                fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                background: category === cat ? "#1a5c38" : "#fff",
                color: category === cat ? "#fff" : "#1a1a18",
                border: `1.5px solid ${category === cat ? "#1a5c38" : "#e8e5de"}`
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <p style={{ color: "#7a7870", fontSize: 14, marginBottom: 16 }}>
          Showing {filtered.length} products
        </p>

        <ProductList products={filtered} onAddToCart={addToCart} />
      </div>
    </div>
  );
}

export default App;