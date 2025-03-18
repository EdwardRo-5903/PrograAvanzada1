// frontend/src/actions/habitActions.js
import axios from 'axios';

export const ADD_HABIT = 'ADD_HABIT';
export const GET_HABITS = 'GET_HABITS';
export const UPDATE_HABIT = 'UPDATE_HABIT';
export const DELETE_HABIT = 'DELETE_HABIT';

export const addHabit = (habit) => async (dispatch) => {
  try {
    const response = await axios.post('/api/habits', habit);
    dispatch({ type: ADD_HABIT, payload: response.data });
  } catch (error) {
    console.error("Error adding habit:", error);
  }
};

export const getHabits = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/habits');
    dispatch({ type: GET_HABITS, payload: response.data });
  } catch (error) {
    console.error("Error fetching habits:", error);
  }
};

export const updateHabit = (id, habit) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/habits/${id}`, habit);
    dispatch({ type: UPDATE_HABIT, payload: response.data });
  } catch (error) {
    console.error("Error updating habit:", error);
  }
};

export const deleteHabit = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/habits/${id}`);
    dispatch({ type: DELETE_HABIT, payload: id });
  } catch (error) {
    console.error("Error deleting habit:", error);
  }
};