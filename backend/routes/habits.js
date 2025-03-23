import express from 'express';
import Habit from '../models/Habit.js';

const router = express.Router();

// Crear un nuevo hábito
router.post('/', async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todos los hábitos
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Marcar un hábito como completado
router.put('/:id/done', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Hábito no encontrado" });

    const today = new Date().setHours(0, 0, 0, 0);
    const lastCompleted = habit.lastCompleted
      ? new Date(habit.lastCompleted).setHours(0, 0, 0, 0)
      : null;

    if (lastCompleted === today) {
      return res.status(400).json({ message: "El hábito ya fue completado hoy" });
    }

    if (lastCompleted && today - lastCompleted > 86400000) {
      // Si han pasado más de 1 día, reinicia la racha
      habit.streak = 1;
    } else {
      // Incrementa la racha
      habit.streak += 1;
    }

    habit.lastCompleted = new Date();
    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un hábito (por ejemplo, cambiar el nombre)
router.put('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!habit) return res.status(404).json({ message: "Hábito no encontrado" });

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un hábito
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Hábito eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;