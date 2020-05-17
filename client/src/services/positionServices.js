import axios from 'axios';
import { GET_POSITIONS } from './types';
import { setSnackbarMessageSuccess, setSnackbarMessageError } from './snackbarServices';

import { setUserLoading } from './authServices';

// Get all position
export const getPositions = () => (dispatch) => {
  axios
    .get('/positions/getAll')
    .then((res) => {
      dispatch(setPosition(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Add new postion
export const addPosition = (position) => async (dispatch) => {
  // Toggle on loading animation
  await dispatch(setUserLoading(true));
  return await axios
    .post('/positions/add', position)
    .then((res) => {
      // Toggle off loading animation
      dispatch(setUserLoading(false));

      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data.msg));
      return Promise.resolve(res.data.positions);
    })
    .catch((err) => {
      // Toggle off loading animation
      dispatch(setUserLoading(false));

      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
    });
};

// Set position
export const setPosition = (payload) => {
  return {
    type: GET_POSITIONS,
    payload: payload,
  };
};
