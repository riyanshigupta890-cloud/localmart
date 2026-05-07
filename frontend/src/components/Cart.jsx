function Cart({ cart, onClose, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.4)", zIndex: 50
        }}
      />

      {/* Cart Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0,
        width: 380, height: "100vh",
        background: "#fff", zIndex: 51,
        display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 20px rgba(0,0,0,0.15)"
      }}>

        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid #e8e5de",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>
            🛒 Your Cart ({cart.reduce((s, i) => s + i.qty, 0)} items)
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none",
              fontSize: 22, cursor: "pointer", color: "#7a7870"
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#7a7870" }}>
              <p style={{ fontSize: 48 }}>🛒</p>
              <p style={{ fontSize: 16 }}>Your cart is empty</p>
              <p style={{ fontSize: 13 }}>Add some products!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item._id} style={{
                display: "flex", gap: 12, marginBottom: 20,
                paddingBottom: 20, borderBottom: "1px solid #e8e5de"
              }}>
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 72, height: 72,
                    objectFit: "cover", borderRadius: 8
                  }}
                />

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 14, color: "#1a5c38", fontWeight: 700, marginBottom: 8 }}>
                    ₹{item.price}
                  </p>

                  {/* Qty Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button
                      onClick={() => onUpdateQty(item._id, -1)}
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        border: "1.5px solid #e8e5de", background: "#fff",
                        fontSize: 16, cursor: "pointer", fontWeight: 600
                      }}
                    >−</button>
                    <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: "center" }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item._id, 1)}
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        border: "1.5px solid #e8e5de", background: "#fff",
                        fontSize: 16, cursor: "pointer", fontWeight: 600
                      }}
                    >+</button>

                    <button
                      onClick={() => onRemove(item._id)}
                      style={{
                        marginLeft: "auto", background: "none",
                        border: "none", color: "#c0392b",
                        fontSize: 12, cursor: "pointer", fontWeight: 500
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{
            padding: "20px 24px",
            borderTop: "1px solid #e8e5de"
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 16
            }}>
              <span style={{ fontSize: 15, color: "#7a7870" }}>Subtotal</span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>₹{total}</span>
            </div>
            <p style={{ fontSize: 12, color: "#1a5c38", marginBottom: 16 }}>
              ✅ Free delivery on this order!
            </p>
            <button
                onClick={onCheckout}
                 style={{
                  width: "100%", background: "#1a5c38", color: "#fff",
                  border: "none", borderRadius: 10, padding: "14px 0",
                  fontSize: 15, fontWeight: 600, cursor: "pointer"
                }}
                >
                Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;