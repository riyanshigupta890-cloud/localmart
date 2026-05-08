import { useState, useEffect } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/admin" });

const STATUSES = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

const emptyProduct = {
  name: "", category: "Groceries", price: "",
  originalPrice: "", image: "", description: "",
  rating: 0, reviews: 0, badge: "", stock: ""
};

function Admin({ password, onLogout , onBack }) {
  const [tab, setTab]               = useState("dashboard");
  const [stats, setStats]           = useState(null);
  const [products, setProducts]     = useState([]);
  const [orders, setOrders]         = useState([]);
  const [form, setForm]             = useState(emptyProduct);
  const [editId, setEditId]         = useState(null);
  const [toast, setToast]           = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

 useEffect(() => {
  const headers = { password };
  if (tab === "dashboard") {
    API.get("/stats", { headers }).then(r => setStats(r.data));
  } else if (tab === "products") {
    API.get("/products", { headers }).then(r => setProducts(r.data));
  } else if (tab === "orders") {
    API.get("/orders", { headers }).then(r => setOrders(r.data));
  }
}, [tab, password]); // ← add password here instead of headers

  const handleSave = async () => {
    const headers = { password };
    try {
      const data = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        stock: Number(form.stock),
        rating: Number(form.rating),
        reviews: Number(form.reviews),
      };
      if (editId) {
        await API.put(`/products/${editId}`, data, { headers });
        showToast("✅ Product updated!");
      } else {
        await API.post("/products", data, { headers });
        showToast("✅ Product added!");
      }
      setForm(emptyProduct);
      setEditId(null);
      API.get("/products", { headers }).then(r => setProducts(r.data));
    } catch {
      showToast("❌ Failed to save product!");
    }
  };

  const handleDelete = async (id) => {
    const headers = { password };
    if (!window.confirm("Delete this product?")) return;
    await API.delete(`/products/${id}`, { headers });
    showToast("🗑️ Product deleted!");
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  const handleEdit = (product) => {
    setForm({ ...product, originalPrice: product.originalPrice || "" });
    setEditId(product._id);
    setTab("add");
  };

  const handleStatusChange = async (orderId, status) => {
    const headers = { password };
    await API.put(`/orders/${orderId}`, { status }, { headers });
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
    showToast("✅ Order status updated!");
  };

  const inputStyle = {
    width: "100%", padding: "9px 12px",
    border: "1.5px solid #e8e5de", borderRadius: 8,
    fontSize: 13, boxSizing: "border-box"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f2", fontFamily: "sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20,
          background: "#1a5c38", color: "#fff",
          padding: "12px 20px", borderRadius: 8,
          fontSize: 14, zIndex: 999, fontWeight: 500
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{
  background: "#fff", borderBottom: "1px solid #e8e5de",
  padding: "0 28px", height: 60,
  display: "flex", alignItems: "center", justifyContent: "space-between"
}}>
  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
    <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1a5c38" }}>
      🛒 LocalMart Admin
    </h1>
    <a href="/" style={{
      textDecoration: "none", color: "#7a7870",
      fontSize: 13, fontWeight: 500
    }}>
      ← Back to Shop
    </a>
  </div>
  <button onClick={onLogout} style={{
    background: "none", border: "1.5px solid #e8e5de",
    borderRadius: 8, padding: "6px 16px",
    fontSize: 13, cursor: "pointer", color: "#7a7870"
  }}>
    Logout
  </button>
  <button onClick={onBack} style={{
  background: "none", border: "none",
  color: "#7a7870", fontSize: 13,
  cursor: "pointer", fontWeight: 500
}}>
  ← Back to Home
</button>
</div>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <aside style={{
          width: 200, background: "#fff",
          borderRight: "1px solid #e8e5de",
          minHeight: "calc(100vh - 60px)", padding: "20px 0"
        }}>
          {[
            ["dashboard", "📊 Dashboard"],
            ["products",  "📦 Products"],
            ["add",       "➕ Add Product"],
            ["orders",    "🧾 Orders"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key); if (key !== "add") { setForm(emptyProduct); setEditId(null); } }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "12px 24px", border: "none", fontSize: 14,
                background: tab === key ? "#e8f4ee" : "none",
                color: tab === key ? "#1a5c38" : "#1a1a18",
                fontWeight: tab === key ? 600 : 400,
                cursor: "pointer", borderLeft: tab === key ? "3px solid #1a5c38" : "3px solid transparent"
              }}
            >
              {label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: 28 }}>

          {/* DASHBOARD */}
          {tab === "dashboard" && stats && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Dashboard</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
                {[
                  ["Total Products", stats.totalProducts, "📦", "#e8f4ee", "#1a5c38"],
                  ["Total Orders",   stats.totalOrders,   "🧾", "#fef4e2", "#c98a12"],
                  ["Total Revenue",  `₹${stats.totalRevenue}`, "💰", "#fdecea", "#c0392b"],
                ].map(([label, value, icon, bg, color]) => (
                  <div key={label} style={{
                    background: bg, borderRadius: 12, padding: "20px 24px"
                  }}>
                    <p style={{ fontSize: 28 }}>{icon}</p>
                    <p style={{ fontSize: 28, fontWeight: 700, color }}>{value}</p>
                    <p style={{ fontSize: 13, color: "#7a7870" }}>{label}</p>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Orders</h3>
              <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e8e5de" }}>
                {stats.recentOrders.map((order, i) => (
                  <div key={order._id} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "14px 20px", alignItems: "center",
                    borderBottom: i < stats.recentOrders.length - 1 ? "1px solid #e8e5de" : "none"
                  }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{order.customerName}</p>
                      <p style={{ fontSize: 12, color: "#7a7870" }}>{order._id.slice(-8)}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>₹{order.totalAmount}</p>
                      <p style={{ fontSize: 12, color: "#1a5c38" }}>{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRODUCTS LIST */}
          {tab === "products" && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
                Products ({products.length})
              </h2>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e5de", overflow: "hidden" }}>
                {products.map((p, i) => (
                  <div key={p._id} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 20px",
                    borderBottom: i < products.length - 1 ? "1px solid #e8e5de" : "none"
                  }}>
                    <img src={p.image} alt={p.name} style={{
                      width: 52, height: 52, objectFit: "cover", borderRadius: 8
                    }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</p>
                      <p style={{ fontSize: 12, color: "#7a7870" }}>{p.category} • Stock: {p.stock}</p>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#1a5c38" }}>₹{p.price}</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => handleEdit(p)} style={{
                        background: "#e8f0fb", color: "#1a5799",
                        border: "none", borderRadius: 6,
                        padding: "6px 14px", fontSize: 12,
                        fontWeight: 600, cursor: "pointer"
                      }}>Edit</button>
                      <button onClick={() => handleDelete(p._id)} style={{
                        background: "#fdecea", color: "#c0392b",
                        border: "none", borderRadius: 6,
                        padding: "6px 14px", fontSize: 12,
                        fontWeight: 600, cursor: "pointer"
                      }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADD / EDIT PRODUCT */}
          {tab === "add" && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
                {editId ? "✏️ Edit Product" : "➕ Add New Product"}
              </h2>
              <div style={{
                background: "#fff", borderRadius: 12, padding: 28,
                border: "1px solid #e8e5de",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16
              }}>
                {[
                  ["Product Name", "name", "text"],
                  ["Price (₹)", "price", "number"],
                  ["Original Price (₹)", "originalPrice", "number"],
                  ["Stock", "stock", "number"],
                  ["Rating (0-5)", "rating", "number"],
                  ["Reviews count", "reviews", "number"],
                  ["Image URL", "image", "text"],
                  ["Badge", "badge", "text"],
                ].map(([label, key, type]) => (
                  <div key={key}>
                    <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                ))}

                {/* Category */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    style={inputStyle}
                  >
                    {["Groceries", "Electronics", "Clothing", "Home & Kitchen", "Beauty"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                {/* Image Preview */}
                {form.image && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Image Preview</p>
                    <img src={form.image} alt="preview" style={{
                      width: 120, height: 90, objectFit: "cover", borderRadius: 8
                    }} />
                  </div>
                )}

                {/* Buttons */}
                <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12 }}>
                  <button onClick={handleSave} style={{
                    background: "#1a5c38", color: "#fff", border: "none",
                    borderRadius: 8, padding: "11px 28px",
                    fontSize: 14, fontWeight: 600, cursor: "pointer"
                  }}>
                    {editId ? "Update Product" : "Add Product"}
                  </button>
                  <button onClick={() => { setForm(emptyProduct); setEditId(null); }} style={{
                    background: "#f7f6f2", color: "#7a7870",
                    border: "1.5px solid #e8e5de", borderRadius: 8,
                    padding: "11px 28px", fontSize: 14, cursor: "pointer"
                  }}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {tab === "orders" && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
                Orders ({orders.length})
              </h2>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e5de", overflow: "hidden" }}>
                {orders.map((order, i) => (
                  <div key={order._id} style={{
                    padding: "16px 20px",
                    borderBottom: i < orders.length - 1 ? "1px solid #e8e5de" : "none"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600 }}>{order.customerName}</p>
                        <p style={{ fontSize: 12, color: "#7a7870", marginBottom: 4 }}>
                          {order.customerEmail}
                        </p>
                        <p style={{ fontSize: 12, color: "#7a7870" }}>
                          {order.items.map(i => `${i.name} ×${i.qty}`).join(", ")}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "#1a5c38", marginBottom: 8 }}>
                          ₹{order.totalAmount}
                        </p>
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order._id, e.target.value)}
                          style={{
                            padding: "6px 10px", borderRadius: 6, fontSize: 12,
                            border: "1.5px solid #e8e5de", cursor: "pointer",
                            background: "#f7f6f2"
                          }}
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Admin;