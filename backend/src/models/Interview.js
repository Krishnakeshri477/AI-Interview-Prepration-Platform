// backend/src/models/Interview.js
const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: [true, 'Role is required'] },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  questions: [{
    question: { type: String, required: true },
    answer: { type: String, required: true },
    feedback: {
      score: { type: Number, min: 0, max: 100 },
      technicalFeedback: String,
      communicationFeedback: String
    },
    audioFeedbackUrl: String
  }],
  overallScore: { type: Number, min: 0, max: 100 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interview', InterviewSchema);