const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products (with optional search, filter, sort)
router.get("/", async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    let query = {};

    // Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Sort options
    let sortOption = {};
    if (sort === "price-asc")  sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "rating")     sortOption = { rating: -1 };
    if (sort === "popular")    sortOption = { reviews: -1 };

    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;