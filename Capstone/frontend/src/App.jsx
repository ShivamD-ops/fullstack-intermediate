import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";
import "./App.css"; // Import the main App CSS
// Define the base URL for the backend API
const API_URL = "http://localhost:5000/api/products";
function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Function to fetch products from the backend
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        "Failed to fetch products. Please ensure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);
  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  // Function to handle adding a new product
  const handleAddProduct = async (newProduct) => {
    setError(null);
    try {
      const response = await axios.post(API_URL, newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      return { success: true };
    } catch (err) {
      console.error("Error adding product:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to add product.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };
  // Function to handle deleting a product
  const handleDeleteProduct = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
    }
  };
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Mini E-commerce Store</h1>
      </header>
      <main className="app-main">
        {/* Error Message Display */}
        {error && (
          <div
            className={`message-box ${
              error.includes("successfully") ? "success" : "error"
            }`}
          >
            <strong>Error!</strong>
            <span> {error}</span>
          </div>
        )}
        {/* Loading Indicator */}
        {loading && (
          <div className="loading-indicator">Loading products...</div>
        )}
        {/* Add Product Form */}
        <AddProductForm onAddProduct={handleAddProduct} />
        {/* Product List */}
        {!loading && (
          <ProductList
            products={products}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </main>
      <footer className="app-footer">
        <p>
          &copy; {new Date().getFullYear()} Mini E-commerce. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
export default App;
