import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { createHabit } from '../redux/features/habitsSlice'; // ✅ ruta corregida

const AddHabit = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(createHabit({ name: name.trim() })).unwrap(); // ✅ ahora sí funciona unwrap
      router.push('/');
    } catch (error) {
      alert(error.message || 'Error al crear hábito');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <button 
          onClick={() => router.back()}
          className="mb-4 text-gray-600 hover:text-gray-800"
        >
          ← Volver
        </button>
        
        <h1 className="text-2xl font-bold mb-6">Nuevo Hábito</h1>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Hacer ejercicio 30 minutos"
            required
            maxLength={50}
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Creando...' : 'Crear Hábito'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;