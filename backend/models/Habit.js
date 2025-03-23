import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3, 
  },
  completedDays: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0, 
  },
  lastCompleted: {
    type: Date,
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
}, { timestamps: true }); 

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;