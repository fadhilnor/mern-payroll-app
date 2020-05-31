import axios from 'axios';
import { GET_PAYROLLS } from './types';
import { setSnackbarMessageSuccess, setSnackbarMessageError } from './snackbarServices';
import { setUserLoading } from './authServices';

// Get all payrolls
export const getPayrolls = () => (dispatch) => {
  axios
    .post('/payrolls/getAll')
    .then((res) => {
      dispatch(setPayrolls(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Add new payroll
export const addPayroll = (payroll) => async (dispatch) => {
  // Toggle on loading animation
  dispatch(setUserLoading(true));

  return await axios
    .post('/payrolls/add', payroll)
    .then((res) => {
      // Toggle off loading animation
      dispatch(setUserLoading(false));

      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data.msg));
      return Promise.resolve(res.data.payrolls);
    })
    .catch((err) => {
      // Toggle off loading animation
      dispatch(setUserLoading(false));

      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
    });
};

// Set payroll
export const setPayrolls = (payload) => {
  return {
    type: GET_PAYROLLS,
    payload: payload,
  };
};
