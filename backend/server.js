const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "LocalMart API is running!" });
});
app.get("/test-db", async (req, res) => {
  try {
    const Product = require("./models/Product");
    const products = await Product.find({});
    res.json({ count: products.length, products });
  } catch (err) {
    res.json({ error: err.message });
  }
});
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection failed:", err.message);
  });