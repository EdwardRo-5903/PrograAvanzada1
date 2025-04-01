import express from "express";
import Habit from "../models/Habit.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Proteger todas las rutas con el middleware de autenticación
router.use(authMiddleware);

// Crear un nuevo hábito
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    // Validar que el nombre del hábito esté presente y no sea solo espacios
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "El nombre del hábito es obligatorio y no puede estar vacío" });
    }

    // Crear el hábito asociado al usuario autenticado
    const newHabit = new Habit({
      name: name.trim(), // Eliminar espacios en blanco
      user: req.user.id, // Asociar el hábito al usuario autenticado
      streak: 0,
      lastCompleted: null,
    });

    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    next(error); // Pasar el error al middleware global
  }
});

// Obtener todos los hábitos del usuario autenticado
router.get("/", async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user.id }); // Filtrar por usuario autenticado
    res.json(habits);
  } catch (error) {
    next(error); // Pasar el error al middleware global
  }
});

// Marcar un hábito como completado
router.put("/:id/done", async (req, res, next) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id }); // Verificar que el hábito pertenece al usuario
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
    next(error); // Pasar el error al middleware global
  }
});

// Actualizar un hábito (por ejemplo, cambiar el nombre)
router.put("/:id", async (req, res, next) => {
  try {
    const { name } = req.body;

    // Validar que el nombre no sea vacío o solo espacios
    if (name && name.trim() === "") {
      return res.status(400).json({ message: "El nombre del hábito no puede estar vacío" });
    }

    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Verificar que el hábito pertenece al usuario
      { ...req.body, name: name?.trim() }, // Eliminar espacios en blanco del nombre
      { new: true, runValidators: true } // Ejecutar validaciones del modelo
    );
    if (!habit) return res.status(404).json({ message: "Hábito no encontrado" });

    res.json(habit);
  } catch (error) {
    next(error); // Pasar el error al middleware global
  }
});

// Eliminar un hábito
router.delete("/:id", async (req, res, next) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // Verificar que el hábito pertenece al usuario
    if (!habit) return res.status(404).json({ message: "Hábito no encontrado" });

    res.json({ message: "Hábito eliminado" });
  } catch (error) {
    next(error); // Pasar el error al middleware global
  }
});

export default router;