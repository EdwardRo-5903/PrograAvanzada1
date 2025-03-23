import {
  ADD_HABIT,
  GET_HABITS,
  UPDATE_HABIT,
  DELETE_HABIT,
  MARK_HABIT_AS_DONE,
  HANDLE_ERROR,
} from '../actions/habitActions';

const initialState = {
  habits: [],
  error: null, // Manejo de errores opcional
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
    case MARK_HABIT_AS_DONE:
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit._id === action.payload._id ? action.payload : habit
        ),
      };
    case HANDLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default habitReducer;