function OrderSuccess({ order, onClose }) {
  return (
    <>
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)", zIndex: 50
      }} />

      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff", borderRadius: 16,
        padding: 40, width: 420, zIndex: 51,
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "#1a5c38" }}>
          Order Placed!
        </h2>
        <p style={{ color: "#7a7870", marginBottom: 24, fontSize: 14 }}>
          Your order has been saved successfully.
        </p>

        {/* Order ID */}
        <div style={{
          background: "#f7f6f2", borderRadius: 10,
          padding: "14px 20px", marginBottom: 24
        }}>
          <p style={{ fontSize: 12, color: "#7a7870", marginBottom: 4 }}>Order ID</p>
          <p style={{
            fontSize: 13, fontWeight: 600,
            color: "#1a1a18", wordBreak: "break-all"
          }}>
            {order._id}
          </p>
        </div>

        {/* Details */}
        <div style={{ textAlign: "left", marginBottom: 24 }}>
          {[
            ["Customer", order.customerName],
            ["Email", order.customerEmail],
            ["Total", `₹${order.totalAmount}`],
            ["Status", order.status],
          ].map(([label, value]) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "8px 0", borderBottom: "1px solid #e8e5de",
              fontSize: 14
            }}>
              <span style={{ color: "#7a7870" }}>{label}</span>
              <span style={{
                fontWeight: 600,
                color: label === "Status" ? "#1a5c38" : "#1a1a18"
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%", background: "#1a5c38", color: "#fff",
            border: "none", borderRadius: 10, padding: "12px 0",
            fontSize: 15, fontWeight: 600, cursor: "pointer"
          }}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
}

export default OrderSuccess;