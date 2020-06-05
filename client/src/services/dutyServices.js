import axios from 'axios';
import { GET_DUTIES } from './types';
import { setSnackbarMessageSuccess, setSnackbarMessageError } from './snackbarServices';

const userId = localStorage.getItem('userId');

// Get all duties
export const getDuties = () => (dispatch) => {
  const user = { userId };
  axios
    .post('/duties/getAll', user)
    .then((res) => {
      dispatch(setDuties(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Add new duty
export const addDuty = (duty) => async (dispatch) => {
  duty.userId = userId;
  return await axios
    .post('/duties/add', duty)
    .then((res) => {
      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data.msg));
      return Promise.resolve(res.data.duties);
    })
    .catch((err) => {
      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
    });
};

// Update duty
export const updateDuty = (duty) => async (dispatch) => {
  return await axios
    .post('/duties/update', duty)
    .then((res) => {
      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data.msg));
      return Promise.resolve(res.data.duties);
    })
    .catch((err) => {
      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
    });
};

// Set Duties
export const setDuties = (payload) => {
  return {
    type: GET_DUTIES,
    payload: payload,
  };
};
