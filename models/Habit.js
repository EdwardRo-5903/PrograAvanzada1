const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completedDays: { type: Number, default: 0 },
  lastCompleted: { type: Date, default: null },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Habit', HabitSchema);
