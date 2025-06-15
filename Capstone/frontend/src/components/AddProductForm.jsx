import React, { useState } from "react";
import "./AddProductForm.css"; // Import the AddProductForm CSS
const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price) {
      setMessage(
        "Please fill in all required fields (Name, Description, Price)."
      );
      return;
    }
    if (isNaN(price) || parseFloat(price) < 0) {
      setMessage("Price must be a non-negative number.");
      return;
    }
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      imageUrl:
        imageUrl || "https://placehold.co/600x400/FFF/000?text=No+Image",
    };
    try {
      await onAddProduct(newProduct);
      setMessage("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      setMessage(error.message || "Failed to add product. Please try again.");
    }
  };
  return (
    <div className="add-product-form-container">
      <h2 className="form-title">Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="form-textarea"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price ($):
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">
            Image URL (Optional):
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="form-input"
            placeholder="e.g., https://example.com/image.jpg"
          />
        </div>
        <button type="submit" className="submit-button">
          Add Product
        </button>
        {message && (
          <p
            className={`form-message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};
export default AddProductForm;
