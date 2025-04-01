import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'El nombre de usuario es obligatorio' });
    }
    if (!password || password.trim() === '') {
      return res.status(400).json({ message: 'La contraseña es obligatoria' });
    }
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ message: 'El nombre de usuario debe tener entre 3 y 30 caracteres' });
    }
    if (password.length < 6 || password.length > 100) {
      return res.status(400).json({ message: 'La contraseña debe tener entre 6 y 100 caracteres' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Crear un nuevo usuario con contraseña hasheada
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username: username.trim(), password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en /register:', error.message);
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'El nombre de usuario es obligatorio' });
    }
    if (!password || password.trim() === '') {
      return res.status(400).json({ message: 'La contraseña es obligatoria' });
    }

    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error('Error en /login:', error.message);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
});

export default router;