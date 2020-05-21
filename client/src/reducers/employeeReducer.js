import { GET_EMPLOYEES } from '../services/types';

const initialState = {
  employee: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employee: [...action.payload],
      };
    default:
      return state;
  }
}
