import { configureStore } from '@reduxjs/toolkit';
import habitsReducer from './features/habitsSlice';

const store = configureStore({
  reducer: {
    habits: habitsReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false // Necesario para manejar acciones asíncronas y objetos Date
    })
});

export default store;