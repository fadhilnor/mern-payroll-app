import axios from 'axios';
import { GET_PAYROLLS } from './types';
import { setSnackbarMessageSuccess, setSnackbarMessageError } from './snackbarServices';
import { setUserLoading } from './authServices';

const userId = localStorage.getItem('userId');

// Get all payrolls
export const getPayrolls = () => (dispatch) => {
  const user = { userId };
  axios
    .post('/payrolls/getAll', user)
    .then((res) => {
      dispatch(setPayrolls(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Add new payroll
export const addPayroll = (payroll) => async (dispatch) => {
  payroll.userId = userId;

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
