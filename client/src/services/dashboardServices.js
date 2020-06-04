import axios from 'axios';
import { GET_ALL_PAYROLLS } from './types';

// Get payroll employee
export const getAllPayrollEmployees = () => (dispatch) => {
  axios
    .post('/payrolls/getAllPayrollEmployees')
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
