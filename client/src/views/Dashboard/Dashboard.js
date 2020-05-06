import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography as MuiTypography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiTypography variant="h3">Welcome to Dashboard!</MuiTypography>
    </div>
  );
};

export default Dashboard;
