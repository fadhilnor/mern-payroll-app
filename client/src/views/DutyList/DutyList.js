import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { DutyTable } from './components';
import { getDuties } from '../../services/dutyServices';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const DutyList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { duty } = useSelector((state) => state.duties);
  const { user } = useSelector((state) => state.auth);

  const loadDuties = useCallback(async () => {
    dispatch(getDuties());
  }, [dispatch]);

  useEffect(() => {
    loadDuties();
  }, [loadDuties]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <DutyTable duties={duty} user={user} />
      </div>
    </div>
  );
};

export default DutyList;
