const router = require("express").Router();
const CV = require("../models/CV");
const auth = require("../middleware/authMiddleware");

/**
 * GET CV milik user yang login
 */
router.get("/me", auth, async (req, res) => {
  try {
    const cv = await CV.findOne({ userId: req.user.id });
    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: "Gagal load CV" });
  }
});

/**
 * CREATE / UPDATE CV (UPSERT)
 * Satu user = satu CV
 */
router.post("/", auth, async (req, res) => {
  try {
    const cv = await CV.findOneAndUpdate(
      { userId: req.user.id },
      { ...req.body, userId: req.user.id },
      { new: true, upsert: true }
    );

    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: "Gagal menyimpan CV" });
  }
});

/**
 * DELETE CV
 */
router.delete("/", auth, async (req, res) => {
  try {
    await CV.findOneAndDelete({ userId: req.user.id });
    res.json({ message: "CV deleted" });
  } catch (err) {
    res.status(500).json({ message: "Gagal hapus CV" });
  }
});

module.exports = router;
