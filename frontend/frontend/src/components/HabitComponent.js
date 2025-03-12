import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHabit, updateHabit } from '../actions/habitActions';

const HabitComponent = ({ habit }) => {
  const dispatch = useDispatch();
  const habits = useSelector(state => state.habits);

  const handleDelete = () => {
    dispatch(deleteHabit(habit._id));
  };

  const handleComplete = () => {
    dispatch(updateHabit(habit._id, { completedDays: habit.completedDays + 1, lastCompleted: new Date() }));
  };

  return (
    <div className="habit">
      <h3>{habit.name}</h3>
      <p>Completed Days: {habit.completedDays}</p>
      <button onClick={handleComplete}>Complete Habit</button>
      <button onClick={handleDelete}>Delete Habit</button>
    </div>
  );
};

export default HabitComponent;