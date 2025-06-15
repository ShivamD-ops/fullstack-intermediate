const express = require("express");
const router = express.Router(); // Create an Express router
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
// Define routes and associate them with controller functions
router
  .route("/")
  .get(getAllProducts) // GET /api/products - Get all products
  .post(addProduct); // POST /api/products - Add a new product
router
  .route("/:id")
  .put(updateProduct) // PUT /api/products/:id - Update a product by ID
  .delete(deleteProduct);
module.exports = router;
