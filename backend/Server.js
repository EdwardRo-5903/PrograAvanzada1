import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import habitRoutes from './routes/habits.js';
import userRoutes from './routes/users.js';


// Cargar variables de entorno
dotenv.config({ path: './.env' });

// Verificar variables de entorno
const verifyEnvVariables = () => {
  const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.error(`❌ Error: La variable ${varName} no está configurada en el archivo .env`);
      process.exit(1);
    }
  });
};
verifyEnvVariables();

// Inicializar la aplicación
const app = express();

// Middlewares de seguridad
app.use(helmet());
//app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Permitir solicitudes desde el frontend
app.use(cors({ origin: 'https://frontend-delta-eight-78.vercel.app', credentials: true })); // Permitir solicitudes desde el frontend

app.use(express.json()); // Parsear JSON en las solicitudes

// Límite de solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 solicitudes por ventana
  message: 'Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde',
});
app.use(limiter);

// Logs HTTP
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logs detallados en desarrollo
} else {
  app.use(morgan('combined')); // Logs más compactos en producción
}

// Rutas
app.use('/users', userRoutes);
app.use('/habits', habitRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conexión exitosa a MongoDB'))
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1); // Salir si no se puede conectar a la base de datos
  });

// Eventos de conexión a MongoDB
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error en la conexión a MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB desconectado. Intentando reconectar...');
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('❌ Error no manejado:', err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Error de validación', errors: err.errors });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'No autorizado' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

export default app;