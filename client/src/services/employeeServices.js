import axios from 'axios';
import { GET_EMPLOYEES } from './types';
import { setSnackbarMessageSuccess, setSnackbarMessageError } from './snackbarServices';

const userId = localStorage.getItem('userId');

// Get all employee
export const getEmployees = () => (dispatch) => {
  const user = { userId };
  axios
    .post('/employees/getAll', user)
    .then((res) => {
      dispatch(setEmployees(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Add new employee
export const addEmployee = (employee) => async (dispatch) => {
  employee.userId = userId;
  return await axios
    .post('/employees/add', employee)
    .then((res) => {
      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data.msg));
      return Promise.resolve(res.data.employees);
    })
    .catch((err) => {
      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
    });
};

// Update employee
export const updateEmployee = (employee) => async (dispatch) => {
  return await axios
    .post('/employees/update', employee)
    .then((res) => {
      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data.msg));
      return Promise.resolve(res.data.employee);
    })
    .catch((err) => {
      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
    });
};

// Set employee
export const setEmployees = (payload) => {
  return {
    type: GET_EMPLOYEES,
    payload: payload,
  };
};
