import axios from "../axiosConfig";
import { setHabits, addHabit, deleteHabit, setError } from "./habitsSlice";

export const fetchHabits = () => async (dispatch) => {
    try {
        const response = await axios.get("/habits");
        dispatch(setHabits(response.data));
    } catch (error) {
        console.error("Error al obtener hábitos", error);
        dispatch(setError("No se pudieron cargar los hábitos. Intenta nuevamente."));
    }
};

export const createHabit = (habit) => async (dispatch) => {
    try {
        const response = await axios.post("/habits", habit);
        dispatch(addHabit(response.data));
    } catch (error) {
        console.error("Error al agregar hábito", error);
        dispatch(setError("No se pudo agregar el hábito. Intenta nuevamente."));
    }
};

export const removeHabit = (id) => async (dispatch) => {
    try {
        await axios.delete(`/habits/${id}`);
        dispatch(deleteHabit(id));
    } catch (error) {
        console.error("Error al eliminar hábito", error);
        dispatch(setError("No se pudo eliminar el hábito. Intenta nuevamente."));
    }
};