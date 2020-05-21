import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { EmployeeTable } from './components';
import { getEmployees } from '../../services/employeeServices';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const PositionList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employees);

  const loadEmployees = useCallback(async () => {
    dispatch(getEmployees());
  }, [dispatch]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <EmployeeTable employee={employee} />
      </div>
    </div>
  );
};

export default PositionList;
