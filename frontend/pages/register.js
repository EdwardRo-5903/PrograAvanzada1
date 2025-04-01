import React, { useState } from 'react';
import axios from '../src/axiosConfig';
import { useRouter } from 'next/router';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones en el frontend
    if (formData.username.trim().length < 3 || formData.username.trim().length > 30) {
      setError('El nombre de usuario debe tener entre 3 y 30 caracteres.');
      return;
    }
    if (formData.password.trim().length < 6 || formData.password.trim().length > 100) {
      setError('La contraseña debe tener entre 6 y 100 caracteres.');
      return;
    }

    setIsLoading(true); // Mostrar el indicador de carga

    try {
      await axios.post('/users/register', formData);
      router.push('/login'); // Redirigir a la página de inicio de sesión
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Error al registrarse');
      } else if (err.request) {
        setError('No se pudo conectar con el servidor. Inténtalo más tarde.');
      } else {
        setError('Ocurrió un error inesperado. Inténtalo más tarde.');
      }
    } finally {
      setIsLoading(false); // Ocultar el indicador de carga
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Regístrate</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Inicia Sesión
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;