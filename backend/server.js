// Backend Server - Express + MongoDB
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/surveyapp';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Survey Schema
const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{
    id: String,
    type: { type: String, enum: ['multiple-choice', 'checkbox', 'text', 'rating'] },
    question: { type: String, required: true },
    options: [String],
    required: Boolean
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Response Schema
const responseSchema = new mongoose.Schema({
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  answers: { type: Map, of: mongoose.Schema.Types.Mixed },
  submittedAt: { type: Date, default: Date.now }
});

const Survey = mongoose.model('Survey', surveySchema);
const Response = mongoose.model('Response', responseSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Survey API Running' });
});

// Get all surveys
app.get('/api/surveys', async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.json({ success: true, data: surveys });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get active surveys
app.get('/api/surveys/active', async (req, res) => {
  try {
    const surveys = await Survey.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: surveys });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single survey
app.get('/api/surveys/:id', async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ success: false, message: 'Survey not found' });
    res.json({ success: true, data: survey });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create survey
app.post('/api/surveys', async (req, res) => {
  try {
    const { title, description, questions, isActive } = req.body;
    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ success: false, message: 'Title and questions required' });
    }
    const survey = new Survey({ title, description, questions, isActive: isActive !== undefined ? isActive : true });
    await survey.save();
    res.status(201).json({ success: true, data: survey });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update survey
app.put('/api/surveys/:id', async (req, res) => {
  try {
    const survey = await Survey.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    if (!survey) return res.status(404).json({ success: false, message: 'Survey not found' });
    res.json({ success: true, data: survey });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete survey
app.delete('/api/surveys/:id', async (req, res) => {
  try {
    await Survey.findByIdAndDelete(req.params.id);
    await Response.deleteMany({ surveyId: req.params.id });
    res.json({ success: true, message: 'Survey deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Submit response
app.post('/api/responses', async (req, res) => {
  try {
    const { surveyId, answers } = req.body;
    if (!surveyId || !answers) return res.status(400).json({ success: false, message: 'Required fields missing' });
    const response = new Response({ surveyId, answers });
    await response.save();
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get responses for survey
app.get('/api/surveys/:id/responses', async (req, res) => {
  try {
    const responses = await Response.find({ surveyId: req.params.id }).sort({ submittedAt: -1 });
    res.json({ success: true, data: responses, count: responses.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get analytics
app.get('/api/surveys/:id/analytics', async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ success: false, message: 'Survey not found' });
    const responses = await Response.find({ surveyId: req.params.id });
    res.json({ success: true, data: { totalResponses: responses.length, survey } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const totalSurveys = await Survey.countDocuments();
    const activeSurveys = await Survey.countDocuments({ isActive: true });
    const totalResponses = await Response.countDocuments();
    res.json({ success: true, data: { totalSurveys, activeSurveys, totalResponses } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Survey API Server Running on Port ${PORT}`);
});

module.exports = app;
