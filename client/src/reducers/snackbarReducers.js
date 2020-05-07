import { MSG_SUCCESS, MSG_ERROR, MSG_REMOVE } from '../services/types';
const isEmpty = require('is-empty');

const initialState = {
  severity: '',
  message: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MSG_SUCCESS:
      return {
        severity: 'success',
        message: action.payload,
        loading: !isEmpty(action.payload),
      };
    case MSG_ERROR:
      return {
        severity: 'error',
        message: action.payload,
        loading: !isEmpty(action.payload),
      };
    case MSG_REMOVE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
