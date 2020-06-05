import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { PositionTable } from './components';
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
  const { position } = useSelector((state) => state.positions);
  const { user } = useSelector((state) => state.auth);

  const loadPositions = useCallback(async () => {
    dispatch(getPositions());
  }, [dispatch]);

  useEffect(() => {
    loadPositions();
  }, [loadPositions]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <PositionTable position={position} user={user} />
      </div>
    </div>
  );
};

export default PositionList;
