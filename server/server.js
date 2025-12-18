require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cv", require("./routes/cv"));

// Test endpoint
app.get("/", (req, res) => {
  res.send("CV Builder API is running");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Port (WAJIB untuk cloud)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
