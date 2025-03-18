import { combineReducers } from 'redux';
import habitReducer from './habitReducer';

const rootReducer = combineReducers({
  habits: habitReducer,
});

export default rootReducer;