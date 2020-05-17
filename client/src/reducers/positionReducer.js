import { GET_POSITIONS } from '../services/types';

const initialState = {
  position: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSITIONS:
      return {
        ...state,
        position: [...action.payload],
      };
    default:
      return state;
  }
}
