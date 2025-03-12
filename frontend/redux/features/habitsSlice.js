import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    habits: [],
};

const habitsSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        setHabits: (state, action) => {
            state.habits = action.payload;
        },
        addHabit: (state, action) => {
            state.habits.push(action.payload);
        },
        deleteHabit: (state, action) => {
            state.habits = state.habits.filter(habit => habit._id !== action.payload);
        }
    },
});

export const { setHabits, addHabit, deleteHabit } = habitsSlice.actions;
export default habitsSlice.reducer;