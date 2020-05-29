import axios from 'axios';
import { GET_PAYROLLS } from './types';

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

// Set payroll
export const setPayrolls = (payload) => {
  return {
    type: GET_PAYROLLS,
    payload: payload,
  };
};
