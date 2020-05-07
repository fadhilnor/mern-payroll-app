import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { setSnackbarMessageRemove } from '../../../../services/snackbarServices';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const MainSnackbar = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { severity, message, loading } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Snackbar open={loading} autoHideDuration={4000} onClose={() => dispatch(setSnackbarMessageRemove())}>
        <Alert onClose={() => dispatch(setSnackbarMessageRemove())} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

MainSnackbar.propTypes = {
  className: PropTypes.string,
};

export default MainSnackbar;
