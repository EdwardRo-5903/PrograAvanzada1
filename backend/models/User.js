import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator'; // Librería para validaciones más robustas

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
    minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
    maxlength: [30, 'El nombre de usuario no puede tener más de 30 caracteres'],
    trim: true, // Elimina espacios en blanco al inicio y al final
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value), // Usa validator para validar el correo
      message: 'Por favor, ingresa un correo electrónico válido',
    },
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    maxlength: [100, 'La contraseña no puede tener más de 100 caracteres'],
    trim: true, // Elimina espacios en blanco al inicio y al final
    validate: {
      validator: (value) => /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(value), // Más flexible
      message: 'La contraseña debe incluir al menos una letra y un número'
    },
  },
});

// Hash de la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Solo hashea si la contraseña fue modificada
  console.log('Hasheando contraseña...'); 
  this.password = await bcrypt.hash(this.password, 10); // Hashea la contraseña con un factor de costo de 10
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Compara la contraseña ingresada con la almacenada
};

// Manejo de errores de índices únicos
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]; // Obtiene el campo que causó el conflicto
    next(new Error(`El ${field} ya está en uso`));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;