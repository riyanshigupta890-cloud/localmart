const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");

// Simple admin auth middleware
const adminAuth = (req, res, next) => {
  const { password } = req.headers;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  next();
};

// GET dashboard stats
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders   = await Order.countDocuments();
    const orders        = await Order.find();
    const totalRevenue  = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const recentOrders  = await Order.find().sort({ createdAt: -1 }).limit(5);
    res.json({ totalProducts, totalOrders, totalRevenue, recentOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all products
router.get("/products", adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new product
router.post("/products", adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update product
router.put("/products/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE product
router.delete("/products/:id", adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all orders
router.get("/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update order status
router.put("/orders/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;