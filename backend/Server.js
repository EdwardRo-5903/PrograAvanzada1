import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Mantén solo una importación de cors
import morgan from 'morgan';
import habitRoutes from './routes/habits.js';
import userRoutes from './routes/users.js';

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error('Error: La variable MONGO_URI no está configurada en el archivo .env');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('Error: La variable JWT_SECRET no está configurada en el archivo .env');
  process.exit(1);
}

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conexión exitosa a MongoDB"))
  .catch(err => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error no manejado:", err.message);
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({ message: "Error interno del servidor", error: err.stack });
  }
  res.status(500).json({ message: "Error interno del servidor" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));