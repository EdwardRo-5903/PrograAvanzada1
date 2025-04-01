import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import HabitList from '../src/components/HabitList';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirigir al login si no hay token
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Momentum</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <HabitList />
      </div>
    </div>
  );
};

export default Home;