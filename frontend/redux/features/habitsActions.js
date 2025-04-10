import axios from "../../src/axiosConfig";
import { setHabits, addHabit, setError, updateHabit } from "./habitsSlice";

// Función helper para manejo de errores
const handleAsyncError = (error, defaultMessage) => {
  const message = error.response?.data?.message || error.message || defaultMessage;
  const status = error.response?.status || 500;
  return { message, status };
};

export const fetchHabits = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/habits");
    dispatch(setHabits(data));
    return data;
  } catch (error) {
    const { message } = handleAsyncError(error, "Error cargando hábitos");
    dispatch(setError(message));
    throw new Error(message);
  }
};

export const createHabit = (habitData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/habits", habitData);
    dispatch(addHabit(data));
    return data;
  } catch (error) {
    const { message } = handleAsyncError(error, "Error creando hábito");
    dispatch(setError(message));
    throw new Error(message);
  }
};

export const markHabitAsDone = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/habits/${id}/done`);
    dispatch(updateHabit(data));
    return data;
  } catch (error) {
    const { message } = handleAsyncError(
      error, 
      `Error completando hábito (ID: ${id})`
    );
    dispatch(setError(message));
    throw new Error(message);
  }
};