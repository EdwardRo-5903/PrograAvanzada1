import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/axiosConfig";

const initialState = {
  habits: [],
  error: null,
  status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
};

// Acciones asíncronas
export const fetchHabits = createAsyncThunk(
  'habits/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/habits");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createHabit = createAsyncThunk(
  'habits/create',
  async (habitData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/habits", habitData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const markHabitAsDone = createAsyncThunk(
  'habits/markDone',
  async (habitId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/habits/${habitId}/done`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
    updateHabit: (state, action) => {
      const index = state.habits.findIndex(h => h._id === action.payload._id);
      if (index !== -1) state.habits[index] = action.payload;
    },
    deleteHabit: (state, action) => {
      state.habits = state.habits.filter(habit => habit._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // búsqueda de Hábitos 
      .addCase(fetchHabits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Error cargando hábitos';
      })
      
      // crear habito
      .addCase(createHabit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.habits.push(action.payload);
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Error creando hábito';
      })
      
      // marcar habito como completado
      .addCase(markHabitAsDone.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(markHabitAsDone.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.habits.findIndex(h => h._id === action.payload._id);
        if (index !== -1) state.habits[index] = action.payload;
      })
      .addCase(markHabitAsDone.rejected, (state, action) => {
        state.status = 'failed';
        // Sólo configurar el error global si el mensaje NO es "El hábito ya fue completado hoy"
        const errorMessage = action.payload?.message || 'Error actualizando hábito';
        if (errorMessage !== 'El hábito ya fue completado hoy') {
          state.error = errorMessage;
        }
      });
  }
});

export const { setHabits, addHabit, deleteHabit, setError, updateHabit } = habitsSlice.actions;
export default habitsSlice.reducer;