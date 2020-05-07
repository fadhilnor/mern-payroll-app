import { MSG_SUCCESS, MSG_ERROR, MSG_REMOVE } from './types';

export const setSnackbarMessageSuccess = (message) => {
  return {
    type: MSG_SUCCESS,
    payload: message,
  };
};

export const setSnackbarMessageError = (message) => (dispatch) => {
  dispatch({
    type: MSG_ERROR,
    payload: message,
  });
};

export const setSnackbarMessageRemove = () => (dispatch) => {
  dispatch({
    type: MSG_REMOVE,
  });
};
