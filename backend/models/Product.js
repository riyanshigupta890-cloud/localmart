const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  category:      { type: String, required: true },
  price:         { type: Number, required: true },
  originalPrice: { type: Number, default: null },
  image:         { type: String },
  description:   { type: String },
  rating:        { type: Number, default: 0 },
  reviews:       { type: Number, default: 0 },
  badge:         { type: String, default: null },
  stock:         { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);