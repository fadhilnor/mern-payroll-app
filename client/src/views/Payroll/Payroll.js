import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { PayrollTable, EmployeePayrollTable } from './components';
import { getPayrolls } from '../../services/payrollServices';
import { getEmployees } from '../../services/employeeServices';
import { getDuties } from '../../services/dutyServices';
import { getPositions } from '../../services/positionServices';

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
  const { position } = useSelector((state) => state.positions);
  const { user } = useSelector((state) => state.auth);
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

  const loadPositions = useCallback(async () => {
    dispatch(getPositions());
  }, [dispatch]);

  useEffect(() => {
    loadPayrolls();
    loadEmployees();
    loadDuties();
    loadPositions();
  }, [loadPayrolls, loadEmployees, loadDuties, loadPositions]);

  const handleToggle = () => {
    setPayrollTable(!payrollTable);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {payrollTable && <PayrollTable payroll={payroll} employee={employee} user={user} onHandleToggle={handleToggle} />}
        {!payrollTable && (
          <EmployeePayrollTable
            payroll={payroll}
            duties={duty}
            positions={position}
            employee={employee}
            user={user}
            onHandleToggle={handleToggle}
          />
        )}
      </div>
    </div>
  );
};

export default Payroll;
