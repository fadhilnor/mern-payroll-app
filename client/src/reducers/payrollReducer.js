import { GET_PAYROLLS } from '../services/types';

const initialState = {
  payroll: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYROLLS:
      return {
        ...state,
        payroll: [...action.payload],
      };
    default:
      return state;
  }
}
