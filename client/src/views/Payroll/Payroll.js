import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { PayrollTable } from './components';
import { getPayrolls } from '../../services/payrollServices';

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

  const loadPayrolls = useCallback(async () => {
    dispatch(getPayrolls());
  }, [dispatch]);

  useEffect(() => {
    loadPayrolls();
  }, [loadPayrolls]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <PayrollTable payroll={payroll} />
      </div>
    </div>
  );
};

export default Payroll;
