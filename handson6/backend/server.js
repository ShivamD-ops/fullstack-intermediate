const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const users = [];
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }
  if (users.find((user) => user.email === email)) {
    return res.status(409).json({ message: "Email already registered." });
  }
  users.push({ name, email, password });
  return res.status(201).json({ message: "User registered successfully." });
});
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
