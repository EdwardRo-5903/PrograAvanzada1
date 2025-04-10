import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import HabitComponent from '../src/components/HabitComponent';
import LogoutButton from '../src/components/LogoutButton';
import { fetchHabits } from '../redux/features/habitsSlice';

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);
  const error = useSelector((state) => state.habits.error);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      dispatch(fetchHabits());
    }
  }, [router, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl">
        <div className="relative mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center">Momentum</h1>
          <div className="absolute top-0 right-0">
            <LogoutButton />
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          {error && (
            <p className="text-red-600 bg-red-50 p-3 rounded-lg text-center mb-6 font-medium">
              {error}
            </p>
          )}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Tus Hábitos</h2>
            <button
              onClick={() => router.push('/add-habit')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              {habits.length > 0 ? '+ Agregar' : '+ Crear Primer Hábito'}
            </button>
          </div>
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">¡Comienza tu viaje de hábitos hoy!</p>
            </div>
          ) : (
            <HabitComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;