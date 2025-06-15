const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); 
// Load environment variables from .env file
dotenv.config();
const app = express(); // Initialize Express app
// Middleware
app.use(express.json()); // Enable parsing of JSON request bodies
app.use(cors()); // Enable CORS for all origins
// Connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    // Log any connection errors and exit the process
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process with failure
  }
};
// Call the connectDB function to establish database connection
connectDB();
// API Routes
// All requests to /api/products will be handled by productRoutes
app.use("/api/products", productRoutes);
// Basic route for testing server
app.get("/", (req, res) => {
  res.send("API is running...");
});
// Define the port to listen on, default to 5000 if not specified in .env
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
