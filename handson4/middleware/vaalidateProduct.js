function validateProduct(req, res, next) {
  const { name, price, description } = req.body;

  if (!name || price === undefined || !description) {
    return res.status(400).json({
      error:
        "Missing required fields: name, price, and description are all required.",
    });
  }

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Invalid or empty name." });
  }
  if (typeof description !== "string" || !description.trim()) {
    return res.status(400).json({ error: "Invalid or empty description." });
  }

  if (typeof price !== "number" || isNaN(price)) {
    return res.status(400).json({ error: "Price must be a valid number." });
  }
  if (price <= 0) {
    return res.status(400).json({ error: "Price must be a positive number." });
  }

  next();
}
module.exports = validateProduct;
