// filepath: c:\Users\EdwardDev\habit-tracker\testConnection.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;

const testConnection = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB exitosa');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
    }
};

testConnection();