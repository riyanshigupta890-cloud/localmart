const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  { name: "Organic Whole Milk",    category: "Groceries",      price: 89,   originalPrice: 110,  image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",  description: "Fresh organic milk from local farms.",       rating: 4.5, reviews: 128, badge: "Best Seller", stock: 50 },
  { name: "Farm Fresh Eggs 12pc",  category: "Groceries",      price: 65,   originalPrice: null, image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&h=300&fit=crop",  description: "Free-range farm-fresh eggs.",                rating: 4.8, reviews: 94,  badge: "Fresh",       stock: 30 },
  { name: "Basmati Rice 5kg",      category: "Groceries",      price: 320,  originalPrice: null, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",  description: "Aged long-grain basmati rice.",              rating: 4.6, reviews: 312, badge: "Popular",     stock: 75 },
  { name: "Herbal Tea Collection", category: "Groceries",      price: 249,  originalPrice: null, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop",   description: "12 aromatic herbal varieties.",              rating: 4.9, reviews: 231, badge: "Top Rated",   stock: 45 },
  { name: "Wireless Earbuds Pro",  category: "Electronics",    price: 1299, originalPrice: 1799, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",  description: "Noise cancelling, 24hr battery life.",       rating: 4.3, reviews: 67,  badge: "Sale",        stock: 15 },
  { name: "Bluetooth Speaker",     category: "Electronics",    price: 899,  originalPrice: 1199, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop", description: "Waterproof, 360-degree sound.",              rating: 4.2, reviews: 78,  badge: "Sale",        stock: 25 },
  { name: "Pure Cotton T-Shirt",   category: "Clothing",       price: 399,  originalPrice: 599,  image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", description: "100% pure cotton, multiple colors.",         rating: 4.1, reviews: 203, badge: null,          stock: 100 },
  { name: "Anti-slip Yoga Mat",    category: "Clothing",       price: 599,  originalPrice: 799,  image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&h=300&fit=crop",  description: "Extra-thick non-slip yoga mat.",             rating: 4.5, reviews: 134, badge: null,          stock: 60 },
  { name: "Non-stick Cookware",    category: "Home & Kitchen", price: 1899, originalPrice: 2499, image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=300&fit=crop",  description: "6-piece cookware set, dishwasher safe.",     rating: 4.4, reviews: 89,  badge: "Sale",        stock: 20 },
  { name: "LED Desk Lamp",         category: "Home & Kitchen", price: 749,  originalPrice: 999,  image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",  description: "5 brightness levels, USB charging port.",    rating: 4.3, reviews: 67,  badge: null,          stock: 35 },
  { name: "Daily Moisturizer",     category: "Beauty",         price: 449,  originalPrice: null, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop", description: "Lightweight SPF 30 daily moisturizer.",      rating: 4.7, reviews: 156, badge: null,          stock: 40 },
  { name: "Pure Aloe Vera Gel",    category: "Beauty",         price: 199,  originalPrice: null, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop",  description: "99% pure aloe vera, multi-purpose.",         rating: 4.6, reviews: 289, badge: "New",         stock: 80 },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Database seeded with", products.length, "products!");
    process.exit();
  })
  .catch(err => {
    console.log("❌ Error:", err);
    process.exit(1);
  });