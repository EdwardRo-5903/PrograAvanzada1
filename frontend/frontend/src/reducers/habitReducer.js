// filepath: habit-tracker/habit-tracker/frontend/src/reducers/habitReducer.js
import { ADD_HABIT, GET_HABITS, UPDATE_HABIT, DELETE_HABIT } from '../actions/habitActions';

const initialState = {
  habits: [],
};

const habitReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HABIT:
      return {
        ...state,
        habits: [...state.habits, action.payload],
      };
    case GET_HABITS:
      return {
        ...state,
        habits: action.payload,
      };
    case UPDATE_HABIT:
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit._id === action.payload._id ? action.payload : habit
        ),
      };
    case DELETE_HABIT:
      return {
        ...state,
        habits: state.habits.filter(habit => habit._id !== action.payload),
      };
    default:
      return state;
  }
};

export default habitReducer;