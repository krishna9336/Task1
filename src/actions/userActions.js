import Axios from "axios";
import { server } from "../index";

export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const createUser = (userData) => ({
  type: "CREATE_USER",
  payload: userData,
});

export const deleteUser = (userId) => ({
  type: "DELETE_USER",
  payload: userId,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});


export const fetchUser = (userId) => (dispatch) => {
  Axios.get(`${server}/${userId}`, { withCredentials: true })
    .then((response) => {
      dispatch(fetchUserSuccess(response?.data));
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
    });
};


export const updateUser = (editedUser) => (dispatch) => {
  Axios.put(`${server}/${editedUser.id}`, editedUser, { withCredentials: true })
    .then((response) => {
      dispatch(updateUserSuccess(response?.data));
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
};
