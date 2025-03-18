import React from 'react';
import ProgressBar from './ProgressBar';
import DoneButton from './DoneButton';

const HabitList = () => {
  const habits = [
    { name: 'Hábito 1', progress: 20 },
    { name: 'Hábito 2', progress: 50 },
    { name: 'Hábito 3', progress: 80 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Hábitos</h2>
      <ul className="list-none space-y-4">
        {habits.map((habit, index) => (
          <li key={index} className="flex items-center space-x-4">
            <span className="flex-1">{habit.name}</span>
            <ProgressBar progress={habit.progress} />
            <DoneButton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;