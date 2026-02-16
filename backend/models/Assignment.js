const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  schemaDefinition: {
    type: Object,
    required: true,
  },
  sampleData: {
    type: Object,
    required: true,
  },
  expectedQuery: {
    type: String,
    required: true,
  },
  hints: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);