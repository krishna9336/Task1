import Axios from 'axios';
import {server} from "../index"
// Action Types
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
// src/actions/userActions.js
export const createUser = (userData) => ({
    type: 'CREATE_USER',
    payload: userData,
  });
  
  export const deleteUser = (userId) => ({
    type: 'DELETE_USER',
    payload: userId,
  });
  // userActions.js


// Action Creators
export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

// Async Action: Fetch User by ID
export const fetchUser = (userId) => (dispatch) => {
  Axios.get(`${server}/${userId}`, { withCredentials: true })
    .then((response) => {
      dispatch(fetchUserSuccess(response.data));
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
    });
};

// Async Action: Update User
export const updateUser = (editedUser) => (dispatch) => {
  Axios.put(`${server}/${editedUser.id}`, editedUser, { withCredentials: true })
    .then((response) => {
      dispatch(updateUserSuccess(response.data));
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
};

  