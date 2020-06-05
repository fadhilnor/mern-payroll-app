import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { EmployeeTable } from './components';
import { getEmployees } from '../../services/employeeServices';
import { getPositions } from '../../services/positionServices';

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
  const { position } = useSelector((state) => state.positions);
  const { user } = useSelector((state) => state.auth);

  const loadEmployees = useCallback(async () => {
    dispatch(getEmployees());
  }, [dispatch]);

  const loadPositions = useCallback(async () => {
    dispatch(getPositions());
  }, [dispatch]);

  useEffect(() => {
    loadEmployees();
    loadPositions();
  }, [loadEmployees, loadPositions]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <EmployeeTable employee={employee} position={position} user={user} />
      </div>
    </div>
  );
};

export default PositionList;
