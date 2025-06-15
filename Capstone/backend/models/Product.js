const mongoose = require("mongoose");
// Define the schema for a Product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true, // Remove whitespace from both ends of a string
    unique: true, // Ensure product names are unique
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"], // Price must be non-negative
  },
  imageUrl: {
    type: String,
    default: "https://placehold.co/600x400/FFF/000?text=No+Image",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Create and export the Product model based on the schema
module.exports = mongoose.model("Product", productSchema);
