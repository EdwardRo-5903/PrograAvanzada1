import axios from "axios";
import { setHabits, addHabit, deleteHabit } from "./habitsSlice";

export const fetchHabits = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:5000/api/habits");
        dispatch(setHabits(response.data));
    } catch (error) {
        console.error("Error al obtener hábitos", error);
    }
};

export const createHabit = (habit) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:5000/api/habits", habit);
        dispatch(addHabit(response.data));
    } catch (error) {
        console.error("Error al agregar hábito", error);
    }
};

export const removeHabit = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/habits/${id}`);
        dispatch(deleteHabit(id));
    } catch (error) {
        console.error("Error al eliminar hábito", error);
    }
};