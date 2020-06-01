import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { PayrollTable, EmployeePayrollTable } from './components';
import { getPayrolls } from '../../services/payrollServices';
import { getEmployees } from '../../services/employeeServices';
import { getDuties } from '../../services/dutyServices';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const Payroll = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { payroll } = useSelector((state) => state.payrolls);
  const { employee } = useSelector((state) => state.employees);
  const { duty } = useSelector((state) => state.duties);
  const [payrollTable, setPayrollTable] = useState(true);

  const loadPayrolls = useCallback(async () => {
    dispatch(getPayrolls());
  }, [dispatch]);

  const loadEmployees = useCallback(async () => {
    dispatch(getEmployees());
  }, [dispatch]);

  const loadDuties = useCallback(async () => {
    dispatch(getDuties());
  }, [dispatch]);

  useEffect(() => {
    loadPayrolls();
    loadEmployees();
    loadDuties();
  }, [loadPayrolls, loadEmployees, loadDuties]);

  const handleToggle = () => {
    setPayrollTable(!payrollTable);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {payrollTable && <PayrollTable payroll={payroll} employee={employee} onHandleToggle={handleToggle} />}
        {!payrollTable && <EmployeePayrollTable duties={duty} onHandleToggle={handleToggle} />}
      </div>
    </div>
  );
};

export default Payroll;
