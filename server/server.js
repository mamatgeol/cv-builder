require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cv", require("./routes/cv"));

// TEST ROOT
app.get("/", (req, res) => {
  res.send("API RUNNING");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("API ready on " + PORT));
