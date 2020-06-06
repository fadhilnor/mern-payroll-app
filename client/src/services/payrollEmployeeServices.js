import axios from 'axios';
import { GET_PAYROLLS_EMPLOYEES } from './types';
import { setSnackbarMessageSuccess, setSnackbarMessageError } from './snackbarServices';
import { setUserLoading } from './authServices';

const userId = localStorage.getItem('userId');

// Get payroll employee
export const getPayrollEmployees = (newPayroll) => (dispatch) => {
  // Toggle on loading animation
  dispatch(setUserLoading(true));

  newPayroll.userId = userId;
  axios
    .post('/payrolls/getPayrollEmployees', newPayroll)
    .then((res) => {
      const payroll = {
        payrollEmployees: res.data,
        empId: newPayroll.empId,
        payId: newPayroll.payId,
      };
      dispatch(setPayrollEmployees(payroll));

      // Toggle off loading animation
      dispatch(setUserLoading(false));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Update payroll employee
export const updatePayrollEmployee = (payroll) => async (dispatch) => {
  return await axios
    .post('/payrolls/updatePayrollEmployees', payroll)
    .then((res) => {
      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data.msg));
      return Promise.resolve(res.data.payroll);
    })
    .catch((err) => {
      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
    });
};

// Set payroll employee
export const setPayrollEmployees = (payload) => {
  return {
    type: GET_PAYROLLS_EMPLOYEES,
    payload: payload,
  };
};
