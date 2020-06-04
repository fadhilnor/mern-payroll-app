import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import snackbarReducer from './snackbarReducers';
import positionReducer from './positionReducer';
import dutyReducer from './dutyReducers';
import employeeReducer from './employeeReducer';
import payrollReducer from './payrollReducer';
import payrollEmployeeReducer from './payrollEmployeeReducer';
import dashboardReducer from './dashboardReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  snackbar: snackbarReducer,
  positions: positionReducer,
  duties: dutyReducer,
  employees: employeeReducer,
  payrolls: payrollReducer,
  payrollEmployees: payrollEmployeeReducer,
  dashboard: dashboardReducer,
});
