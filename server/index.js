const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database Connected'))
  .catch(err => console.error(err));

const ExperienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  year: String,
  description: String
});

const Experience = mongoose.model('Experience', ExperienceSchema);

app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/experiences', async (req, res) => {
  const newExperience = new Experience({
    company: req.body.company,
    role: req.body.role,
    year: req.body.year,
    description: req.body.description
  });

  try {
    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/experiences/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));