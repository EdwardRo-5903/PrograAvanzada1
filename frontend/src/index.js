import React from 'react';
import HabitList from '../components/HabitList';
import DoneButton from '../components/DoneButton';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenido a mi aplicación Next.js</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <HabitList />
        <DoneButton />
      </div>
    </div>
  );
};

export default Home;