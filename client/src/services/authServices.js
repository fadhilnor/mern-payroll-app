import axios from 'axios';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

import setAuthToken from '../utils/setAuthToken';
import processToken from '../utils/processToken';

// Register User
export const registerUser = (userData) => (dispatch) => {
  axios
    .post('/users/register', userData)
    .then((res) => {
      // Process token from server
      const { token } = res.data;
      processToken(token).then((decoded) => {
        // Set current user
        dispatch(setCurrentUser(decoded));
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error,
      })
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/users/login', userData)
    .then((res) => {
      // Process token from server
      const { token } = res.data;
      processToken(token).then((decoded) => {
        // Set current user
        dispatch(setCurrentUser(decoded));
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error,
      });
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
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
