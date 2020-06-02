import { GET_PAYROLLS_EMPLOYEES } from '../services/types';

const initialState = {
  payrollEmployees: [],
  empId: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYROLLS_EMPLOYEES:
      return {
        ...state,
        payrollEmployees: [...action.payload.payrollEmployees],
        empId: action.payload.empId,
      };
    default:
      return state;
  }
}
