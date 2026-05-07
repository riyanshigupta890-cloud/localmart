const mongoose = require("mongoose");
require("dotenv").config();

console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ MISSING");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected!");
    const cols = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", cols.map(c => c.name));
    process.exit();
  })
  .catch((err) => {
    console.log("❌ FAILED:", err.message);
    process.exit();
  });