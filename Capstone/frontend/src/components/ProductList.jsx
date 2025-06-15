import React from "react";
import "./ProductList.css"; // Import the ProductList CSS
const ProductList = ({ products, onDeleteProduct }) => {
  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Available Products</h2>
      {products.length === 0 ? (
        <p className="no-products-message">No products available. Add some!</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/FFF/000?text=Image+Not+Found";
                }}
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button
                onClick={() => onDeleteProduct(product._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductList;
