import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'; // Configura la URL base

export const ADD_HABIT = 'ADD_HABIT';
export const GET_HABITS = 'GET_HABITS';
export const UPDATE_HABIT = 'UPDATE_HABIT';
export const DELETE_HABIT = 'DELETE_HABIT';
export const MARK_HABIT_AS_DONE = 'MARK_HABIT_AS_DONE';
export const HANDLE_ERROR = 'HANDLE_ERROR';

const handleError = (error, dispatch) => {
  console.error(error);
  dispatch({ type: HANDLE_ERROR, payload: error.response?.data?.message || 'Ocurrió un error' });
};

export const addHabit = (habit) => async (dispatch) => {
  try {
    const response = await axios.post('/api/habits', habit);
    dispatch({ type: ADD_HABIT, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const getHabits = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/habits');
    dispatch({ type: GET_HABITS, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const updateHabit = (id, habit) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/habits/${id}`, habit);
    dispatch({ type: UPDATE_HABIT, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const deleteHabit = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/habits/${id}`);
    dispatch({ type: DELETE_HABIT, payload: id });
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const markHabitAsDone = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/habits/${id}/done`);
    dispatch({ type: MARK_HABIT_AS_DONE, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
  }
};