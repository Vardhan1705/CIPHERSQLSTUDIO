const mongoose = require('mongoose');

const AttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  result: {
    type: Object,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  executionTime: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Attempt', AttemptSchema);