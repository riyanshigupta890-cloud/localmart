import { useState } from "react";
import { placeOrder } from "../services/api";

function Checkout({ cart, onClose, onSuccess }) {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validation
    if (!form.customerName || !form.customerEmail || !form.address) {
      setError("Please fill all fields!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        address: form.address,
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          qty: item.qty,
        })),
        totalAmount: total,
      };

      const res = await placeOrder(orderData);
      onSuccess(res.data);
    } catch (err) {
      setError("Failed to place order. Try again!");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.5)", zIndex: 50
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff", borderRadius: 16,
        padding: 32, width: 460, zIndex: 51,
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 24
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Checkout</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none",
            fontSize: 22, cursor: "pointer", color: "#7a7870"
          }}>✕</button>
        </div>

        {/* Order Summary */}
        <div style={{
          background: "#f7f6f2", borderRadius: 10,
          padding: "14px 16px", marginBottom: 24
        }}>
          <p style={{ fontSize: 13, color: "#7a7870", marginBottom: 8 }}>
            Order Summary
          </p>
          {cart.map(item => (
            <div key={item._id} style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 13, marginBottom: 4
            }}>
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <div style={{
            borderTop: "1px solid #e8e5de", marginTop: 10,
            paddingTop: 10, display: "flex",
            justifyContent: "space-between", fontWeight: 700
          }}>
            <span>Total</span>
            <span style={{ color: "#1a5c38" }}>₹{total}</span>
          </div>
        </div>

        {/* Form */}
        {[
          { label: "Full Name", name: "customerName", type: "text", placeholder: "Enter your full name" },
          { label: "Email", name: "customerEmail", type: "email", placeholder: "Enter your email" },
          { label: "Delivery Address", name: "address", type: "text", placeholder: "Enter your full address" },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#1a1a18", display: "block", marginBottom: 6 }}>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              style={{
                width: "100%", padding: "10px 14px",
                border: "1.5px solid #e8e5de", borderRadius: 8,
                fontSize: 14, outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
        ))}

        {error && (
          <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 12 }}>
            ⚠️ {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", background: loading ? "#7a7870" : "#1a5c38",
            color: "#fff", border: "none", borderRadius: 10,
            padding: "14px 0", fontSize: 15, fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Placing Order..." : "Place Order →"}
        </button>
      </div>
    </>
  );
}

export default Checkout;