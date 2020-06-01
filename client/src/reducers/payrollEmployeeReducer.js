import { GET_PAYROLLS_EMPLOYEES } from '../services/types';

const initialState = {
  payrollEmployees: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYROLLS_EMPLOYEES:
      return {
        ...state,
        payrollEmployees: [...action.payload],
      };
    default:
      return state;
  }
}
