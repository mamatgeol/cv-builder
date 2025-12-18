const router = require("express").Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // 1. Cek apakah email benar-benar sudah ada
    const existingUser = await User.findOne({ email: req.body.email });
    
    if (existingUser) {
      return res.status(400).json("Email ini sudah terdaftar, gunakan email lain.");
    }

    // 2. Jika tidak ada, buat user baru
    const newUser = new User({
      username: req.body.username || req.body.name, // Sesuaikan dengan schema database kamu (username/name)
      email: req.body.email,
      password: req.body.password
    });

    const user = await newUser.save();
    res.status(200).json(user);

  } catch (err) {
    // 3. Tampilkan error ASLI dari database (misal: password kurang panjang, dll)
    console.log("Error saat Register:", err.message); 
    res.status(500).json(err.message); 
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(404).json("User tidak ditemukan");
    }

    // Validasi password sederhana (jika belum di-hash)
    // Catatan: Sebaiknya gunakan bcrypt untuk compare password di production
    if (user.password !== req.body.password) {
      return res.status(400).json("Password salah");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;