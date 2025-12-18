const router = require("express").Router();
const CV = require("../models/CV");

// CREATE
router.post("/", async (req, res) => {
  const cv = await CV.create(req.body);
  res.json(cv);
});

// READ
router.get("/:userId", async (req, res) => {
  const cv = await CV.findOne({ userId: req.params.userId });
  res.json(cv);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const cv = await CV.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cv);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await CV.findByIdAndDelete(req.params.id);
  res.json("CV deleted");
});

module.exports = router;
