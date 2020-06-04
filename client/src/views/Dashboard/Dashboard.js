import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { MonthlyAmount } from './components';

import { getAllPayrollEmployees } from '../../services/dashboardServices';
import { getPayrolls } from '../../services/payrollServices';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { payroll } = useSelector((state) => state.payrolls);
  const { employePayrolls } = useSelector((state) => state.dashboard);

  const loadEmployeePayrolls = useCallback(async () => {
    dispatch(getAllPayrollEmployees());
  }, [dispatch]);

  const loadPayrolls = useCallback(async () => {
    dispatch(getPayrolls());
  }, [dispatch]);

  useEffect(() => {
    loadEmployeePayrolls();
    loadPayrolls();
  }, [loadPayrolls, loadEmployeePayrolls]);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          {/* <MonthlyAmount payroll={payroll} /> */}
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          {/* <TasksProgress /> */}
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          {/* <TotalProfit /> */}
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          {/* <LatestSales /> */}
          <MonthlyAmount employePayrolls={employePayrolls} payroll={payroll} />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          {/* <UsersByDevice /> */}
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          {/* <LatestProducts /> */}
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          {/* <LatestOrders /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
