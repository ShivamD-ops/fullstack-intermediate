const express = require("express");
const app = express();
const PORT = 3000;
const validateProduct = require("./middleware/validateProduct");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

const products = [];
let nextProductId = 1;
app.get("/", (req, res) => {
  res.send("Welcome to the Product API!");
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.post("/products", validateProduct, (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = {
    id: nextProductId++,
    name,
    price,
    description,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

app.put("/products/:id", validateProduct, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existingProductIndex = products.findIndex((p) => p.id === id);
    if (existingProductIndex === -1) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }
    products[existingProductIndex] = { id: id, ...req.body };
    res.json({
      message: "Product updated successfully",
      product: products[existingProductIndex],
    });
  } catch (err) {
    next(err);
  }
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found." });
  }

  products.splice(index, 1);

  res.json({ message: "Product deleted successfully." });
});
