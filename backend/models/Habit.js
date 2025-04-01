import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del hábito es obligatorio'],
    minlength: [3, 'El nombre del hábito debe tener al menos 3 caracteres'],
    trim: true, // Elimina espacios en blanco al inicio y al final
  },
  completedDays: {
    type: Number,
    default: 0,
    min: [0, 'El número de días completados no puede ser negativo'],
  },
  streak: {
    type: Number,
    default: 0,
    min: [0, 'La racha no puede ser negativa'],
  },
  lastCompleted: {
    type: Date,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Relación con el modelo User
    required: [true, 'El ID del usuario es obligatorio'],
  },
}, { 
  timestamps: true, // Añade createdAt y updatedAt automáticamente
});

// Índice para optimizar consultas por usuario
habitSchema.index({ user: 1 });

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;