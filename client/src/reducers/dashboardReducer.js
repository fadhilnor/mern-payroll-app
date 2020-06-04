import { GET_ALL_PAYROLLS } from '../services/types';

const initialState = {
  employePayrolls: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PAYROLLS:
      return {
        ...state,
        employePayrolls: [...action.payload],
      };
    default:
      return state;
  }
}
