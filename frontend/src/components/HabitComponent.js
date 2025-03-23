import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHabits, markHabitAsDone } from '../actions/habitActions';
import ProgressBar from './ProgressBar';
import DoneButton from './DoneButton';

const HabitComponent = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits); // Obtiene los hábitos del estado global
  const error = useSelector((state) => state.habits.error); // Obtiene el error del estado global

  // Obtener los hábitos al cargar el componente
  useEffect(() => {
    dispatch(getHabits());
  }, [dispatch]);

  const handleDone = (id) => {
    dispatch(markHabitAsDone(id)); // Marca el hábito como completado
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Hábitos</h2>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Muestra el error si existe */}
      {habits.length === 0 ? (
        <p className="text-center">No hay hábitos disponibles. ¡Agrega uno nuevo!</p>
      ) : (
        <ul className="list-none space-y-4">
          {habits.map((habit) => (
            <li key={habit._id} className="flex items-center space-x-4">
              <span className="flex-1">{habit.name}</span>
              <ProgressBar progress={Math.min((habit.streak / 66) * 100, 100)} />
              <DoneButton onDone={() => handleDone(habit._id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitComponent;