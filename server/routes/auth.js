const router = require("express").Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json("Email sudah digunakan");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  res.json(user);
});

module.exports = router;
