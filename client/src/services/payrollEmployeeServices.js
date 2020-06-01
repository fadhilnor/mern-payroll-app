import axios from 'axios';
import { GET_PAYROLLS_EMPLOYEES } from './types';

// Get payroll employee
export const getPayrollEmployees = (payId) => (dispatch) => {
  axios
    .post('/payrolls/getPayrollEmployees', payId)
    .then((res) => {
      dispatch(setPayrollEmployees(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Set payroll employee
export const setPayrollEmployees = (payload) => {
  return {
    type: GET_PAYROLLS_EMPLOYEES,
    payload: payload,
  };
};
