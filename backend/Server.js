import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import habitRoutes from './routes/habits.js';
import userRoutes from './routes/Users.js'; // Importa las rutas de usuarios

dotenv.config();

// Validar que la variable MONGO_URI esté configurada
if (!process.env.MONGO_URI) {
  console.error('Error: La variable MONGO_URI no está configurada en el archivo .env');
  process.exit(1);
}

const app = express(); // Inicializa la aplicación Express

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Registrar solicitudes HTTP

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB conectada"))
  .catch(err => console.log(err));

// Rutas
app.use('/api/habits', habitRoutes); // Rutas de hábitos
app.use('/api/users', userRoutes); // Rutas de usuarios

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));