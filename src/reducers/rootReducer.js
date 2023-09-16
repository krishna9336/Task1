// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Import your individual reducers

const rootReducer = combineReducers({
  user: userReducer, // Add your reducers here
  // Other reducers...
});

export default rootReducer;
