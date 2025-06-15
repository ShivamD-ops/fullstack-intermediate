const Product = require("../models/Product"); // Import the Product model
// @desc Get all products
// @route GET /api/products
// @access Public
exports.getAllProducts = async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find({});
    // Send the products as a JSON response
    res.status(200).json(products);
  } catch (error) {
    // If an error occurs, send a 500 status with an error message
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Server Error: Could not retrieve products." });
  }
};
// @desc Add a new product
// @route POST /api/products
// @access Public
exports.addProduct = async (req, res) => {
  try {
    // Extract product details from the request body
    const { name, description, price, imageUrl } = req.body;
    // Validate if required fields are present
    if (!name || !description || !price) {
      return res
        .status(400)
        .json({
          message:
            "Please enter all required fields: name, description, and price.",
        });
    }
    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
    });
    // Save the new product to the database
    const product = await newProduct.save();

    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      return res
        .status(409)
        .json({ message: "A product with this name already exists." });
    }
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server Error: Could not add product." });
  }
};
// @desc Update a product by ID
// @route PUT /api/products/:id
// @access Public
exports.updateProduct = async (req, res) => {
  try {
    // Find the product by ID and update it with the request body data
    // { new: true } returns the updated document
    // { runValidators: true } runs schema validators on update
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // If no product is found with the given ID, send a 404 response
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    // Send the updated product as a JSON response
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Server Error: Could not update product." });
  }
};
// @desc Delete a product by ID
// @route DELETE /api/products/:id
// @access Public
exports.deleteProduct = async (req, res) => {
  try {
    // Find the product by ID and delete it
    const product = await Product.findByIdAndDelete(req.params.id);
    // If no product is found, send a 404 response
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    // Send a success message
    res.status(200).json({ message: "Product successfully deleted." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Server Error: Could not delete product." });
  }
};
