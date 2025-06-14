const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const products = [];
let nextProductId = 1;

app.get("/", (req, res) => {
  res.send("Welcome to the Product API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.post("/products", (req, res) => {
  const { name, price, description } = req.body;

  if (!name || price === undefined || !description) {
    return res
      .status(400)
      .json({ message: "Name, price, and description are required." });
  }
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

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  res.json(product);
});

app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found." });
  }

  products[index] = {
    ...products[index],
    ...updatedData,
    id: products[index].id,
  };

  res.json(products[index]);
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
