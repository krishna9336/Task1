// src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Use redux-thunk for handling asynchronous actions
import rootReducer from './reducers'; // Import your combined reducers

// Create a combined reducer if you have multiple reducers
const combinedReducer = combineReducers({
  // Include your reducers here
  user: rootReducer, // Example if you have a 'user' reducer
});

// Create the Redux store with middleware
const store = createStore(
  combinedReducer, // Use the combined reducer
  applyMiddleware(thunk) // Apply middleware (e.g., redux-thunk for async actions)
);yyy

export default store;
