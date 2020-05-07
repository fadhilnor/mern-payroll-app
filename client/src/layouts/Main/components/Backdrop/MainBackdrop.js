import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.dark,
  },
}));

const MainBackdrop = (props) => {
  const { className, ...rest } = props;
  const { loading } = useSelector((state) => state.auth);

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

MainBackdrop.propTypes = {
  className: PropTypes.string,
};

export default MainBackdrop;
