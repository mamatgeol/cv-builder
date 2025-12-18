const mongoose = require("mongoose");

const CVSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  personal: {
    name: String,
    email: String,
    phone: String
  },
  education: [{ school: String, year: String }],
  experience: [{ company: String, role: String }],
  skills: [String]
});

module.exports = mongoose.model("CV", CVSchema);
