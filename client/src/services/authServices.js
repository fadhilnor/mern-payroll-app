import axios from 'axios';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

import setAuthToken from '../utils/setAuthToken';
import processToken from '../utils/processToken';

import { setSnackbarMessageSuccess } from './snackbarServices';

// Register User
export const registerUser = (userData) => (dispatch) => {
  // Toggle on loading animation
  dispatch(setUserLoading(true));
  axios
    .post('/users/register', userData)
    .then((res) => {
      // Process token from server
      const { token } = res.data;
      processToken(token).then((decoded) => {
        // Set current user
        dispatch(setCurrentUser(decoded));
        // Toggle off loading animation
        dispatch(setUserLoading(false));
      });
    })
    .catch((err) => {
      // Toggle off loading animation
      dispatch(setUserLoading(false));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error,
      });
    });
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  // Toggle on loading animation
  dispatch(setUserLoading(true));
  axios
    .post('/users/login', userData)
    .then((res) => {
      // Process token from server
      const { token } = res.data;
      processToken(token).then((decoded) => {
        // Set current user
        dispatch(setCurrentUser(decoded));
        // Toggle off loading animation
        dispatch(setUserLoading(false));
      });
    })
    .catch((err) => {
      // Toggle off loading animation
      dispatch(setUserLoading(false));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error,
      });
    });
};

// Update user password
export const updateUserPassword = () => (dispatch) => {
  // TO DO - Add backend api
  const message = 'Update Success!';
  dispatch(setSnackbarMessageSuccess(message));
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = (payload) => {
  return {
    type: USER_LOADING,
    payload: payload,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
