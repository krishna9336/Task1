// src/actions/userActions.js
export const createUser = (userData) => ({
    type: 'CREATE_USER',
    payload: userData,
  });
  
  export const deleteUser = (userId) => ({
    type: 'DELETE_USER',
    payload: userId,
  });
  
  // Define other actions as needed
  