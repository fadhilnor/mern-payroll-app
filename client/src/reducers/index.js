import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import snackbarReducer from './snackbarReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  snackbar: snackbarReducer,
});
