import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markHabitAsDone } from '../../redux/features/habitsSlice'; 
import ProgressBar from './ProgressBar';
import DoneButton from './DoneButton';

const HabitComponent = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);
  const [habitMessages, setHabitMessages] = useState({}); // Estado para almacenar mensajes para cada hábito

  const calculateProgress = (streak) => {
    return Math.min(Math.round((streak / 66) * 100), 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No completado aún';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleMarkAsDone = async (habitId) => {
    try {
      await dispatch(markHabitAsDone(habitId)).unwrap(); // usar unwrap con createAsyncThunk
      setHabitMessages((prev) => ({ ...prev, [habitId]: '' })); // mensaje de success
    } catch (error) {
      const message = error.message || 'Error al completar el hábito';
      setHabitMessages((prev) => ({ ...prev, [habitId]: message }));
    }
  };

  return (
    <div className="space-y-6">
      {habits.map((habit) => (
        <div
          key={habit._id}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg text-gray-800">{habit.name}</h3>
            <span className="text-sm text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              {habit.streak} / 66 días
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Última completitud: {formatDate(habit.lastCompleted)}
          </div>
          <div className="flex items-center gap-4">
            <ProgressBar progress={calculateProgress(habit.streak)} />
            <DoneButton
              onDone={() => handleMarkAsDone(habit._id)}
              disabled={habitMessages[habit._id] === 'El hábito ya fue completado hoy'}
            />
          </div>
          {habitMessages[habit._id] && (
            <p
              className={`text-sm mt-2 text-center ${
                habitMessages[habit._id] === 'El hábito ya fue completado hoy'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {habitMessages[habit._id]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default HabitComponent;