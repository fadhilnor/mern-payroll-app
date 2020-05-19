import { GET_DUTIES } from '../services/types';

const initialState = {
  duty: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DUTIES:
      return {
        ...state,
        duty: [...action.payload],
      };
    default:
      return state;
  }
}
