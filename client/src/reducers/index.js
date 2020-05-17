import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import snackbarReducer from './snackbarReducers';
import positionReducer from './positionReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  snackbar: snackbarReducer,
  positions: positionReducer,
});
