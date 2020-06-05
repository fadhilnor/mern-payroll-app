import axios from 'axios';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

import setAuthToken from '../utils/setAuthToken';
import processToken from '../utils/processToken';

import { setSnackbarMessageSuccess, setSnackbarMessageError } from './snackbarServices';

// Register User
export const registerUser = (userData) => (dispatch) => {
  // Toggle on loading animation
  dispatch(setUserLoading(true));
  axios
    .post('/users/register', userData)
    .then((res) => {
      // Process token from server
      const { token, user } = res.data;
      processToken(token).then((decoded) => {
        localStorage.setItem('userId', user.userId);
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
      const { token, user } = res.data;
      processToken(token).then((decoded) => {
        // Set current user
        dispatch(setCurrentUser(decoded));
        localStorage.setItem('userId', user.userId);
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
export const updateUserPassword = (userData) => async (dispatch) => {
  // Toggle on loading animation
  await dispatch(setUserLoading(true));
  await axios
    .post('/users/updatePassword', userData)
    .then((res) => {
      // Toggle off loading animation
      dispatch(setUserLoading(false));

      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data));
      return Promise.resolve();
    })
    .catch((err) => {
      // Toggle off loading animation
      dispatch(setUserLoading(false));

      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
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
  localStorage.removeItem('userId');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
