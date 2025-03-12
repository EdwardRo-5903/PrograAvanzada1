import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completedDays: { type: Number, default: 0 },
  lastCompleted: { type: Date, default: null },
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;