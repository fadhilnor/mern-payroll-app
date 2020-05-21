import axios from 'axios';
import { GET_EMPLOYEES } from './types';
import { setSnackbarMessageSuccess, setSnackbarMessageError } from './snackbarServices';

// Get all employee
export const getEmployees = () => (dispatch) => {
  axios
    .post('/employees/getAll')
    .then((res) => {
      dispatch(setEmployees(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Set employee
export const setEmployees = (payload) => {
  return {
    type: GET_EMPLOYEES,
    payload: payload,
  };
};
