import axios from 'axios';
import { GET_ALL_PAYROLLS } from './types';

const userId = localStorage.getItem('userId');

// Get payroll employee
export const getAllPayrollEmployees = () => (dispatch) => {
  const user = { userId };
  axios
    .post('/payrolls/getAllPayrollEmployees', user)
    .then((res) => {
      dispatch(setAllPayrollEmployees(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Set payroll employee
export const setAllPayrollEmployees = (payload) => {
  return {
    type: GET_ALL_PAYROLLS,
    payload: payload,
  };
};
