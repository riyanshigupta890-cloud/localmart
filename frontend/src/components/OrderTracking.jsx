import { useState } from "react";
import { getOrderById } from "../services/api";

const STEPS = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

function OrderTracking({ onClose }) {
  const [orderId, setOrderId]   = useState("");
  const [order, setOrder]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const handleTrack = async () => {
    if (!orderId.trim()) {
      setError("Please enter an Order ID!");
      return;
    }
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const res = await getOrderById(orderId.trim());
      setOrder(res.data);
    } catch (err) {
      setError("Order not found! Check your Order ID.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? STEPS.indexOf(order.status) : -1;

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)", zIndex: 50
      }} />

      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff", borderRadius: 16,
        padding: 32, width: 500, zIndex: 51,
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        maxHeight: "90vh", overflowY: "auto"
      }}>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 24
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>📦 Track Your Order</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none",
            fontSize: 22, cursor: "pointer", color: "#7a7870"
          }}>✕</button>
        </div>

        {/* Search */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <input
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            placeholder="Enter your Order ID..."
            style={{
              flex: 1, padding: "10px 14px",
              border: "1.5px solid #e8e5de",
              borderRadius: 8, fontSize: 14
            }}
          />
          <button
            onClick={handleTrack}
            disabled={loading}
            style={{
              background: "#1a5c38", color: "#fff",
              border: "none", borderRadius: 8,
              padding: "10px 20px", fontSize: 14,
              fontWeight: 600, cursor: "pointer"
            }}
          >
            {loading ? "..." : "Track"}
          </button>
        </div>

        {error && (
          <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 16 }}>
            ⚠️ {error}
          </p>
        )}

        {/* Order Details */}
        {order && (
          <div>
            {/* Info */}
            <div style={{
              background: "#f7f6f2", borderRadius: 10,
              padding: "14px 16px", marginBottom: 24
            }}>
              {[
                ["Order ID", order._id],
                ["Customer", order.customerName],
                ["Total", `₹${order.totalAmount}`],
                ["Date", new Date(order.createdAt).toLocaleDateString("en-IN")],
              ].map(([label, value]) => (
                <div key={label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "6px 0", fontSize: 13,
                  borderBottom: "1px solid #e8e5de"
                }}>
                  <span style={{ color: "#7a7870" }}>{label}</span>
                  <span style={{
                    fontWeight: 600, color: "#1a1a18",
                    wordBreak: "break-all", textAlign: "right",
                    maxWidth: "60%"
                  }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Progress Tracker */}
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>
              Order Progress
            </h3>
            <div style={{ position: "relative", paddingLeft: 32 }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute", left: 10, top: 8,
                width: 2, height: "calc(100% - 32px)",
                background: "#e8e5de"
              }} />

              {STEPS.map((step, index) => {
                const done = index <= currentStep;
                const active = index === currentStep;
                return (
                  <div key={step} style={{
                    display: "flex", alignItems: "flex-start",
                    gap: 14, marginBottom: 24, position: "relative"
                  }}>
                    {/* Circle */}
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: done ? "#1a5c38" : "#e8e5de",
                      border: `3px solid ${done ? "#1a5c38" : "#e8e5de"}`,
                      position: "absolute", left: -32,
                      display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0
                    }}>
                      {done && (
                        <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>
                      )}
                    </div>

                    {/* Label */}
                    <div>
                      <p style={{
                        fontSize: 14, fontWeight: active ? 700 : 500,
                        color: done ? "#1a1a18" : "#7a7870"
                      }}>
                        {step}
                        {active && (
                          <span style={{
                            marginLeft: 8, background: "#e8f4ee",
                            color: "#1a5c38", fontSize: 11,
                            padding: "2px 8px", borderRadius: 50, fontWeight: 600
                          }}>
                            Current
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Items */}
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
              Items Ordered
            </h3>
            {order.items.map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: "1px solid #e8e5de",
                fontSize: 13
              }}>
                <span>{item.name} × {item.qty}</span>
                <span style={{ fontWeight: 600 }}>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default OrderTracking;