const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName:  { type: String, required: true },
  customerEmail: { type: String, required: true },
  address:       { type: String, required: true },
  items: [
    {
      productId:   { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name:        { type: String },
      price:       { type: Number },
      qty:         { type: Number },
    }
  ],
  totalAmount:   { type: Number, required: true },
  status: {
    type: String,
    enum: ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"],
    default: "Order Placed",
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);