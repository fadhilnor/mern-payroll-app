import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { updateUserPassword } from '../../../../services/authServices';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Password = (props) => {
  const { className, ...rest } = props;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    confirm: '',
    showPassword: false,
    showPasswordConfirm: false,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleToggle = (name) => () => {
    setValues({
      ...values,
      [name]: !values[name],
    });
  };

  const handleUpdate = () => {
    if (user.isDemoUser) return;
    const newUpdate = {
      email: user.email,
      password: values.password,
      passwordConfirm: values.confirm,
    };
    dispatch(updateUserPassword(newUpdate))
      .then(() => {
        setValues({
          ...values,
          password: '',
          confirm: '',
        });
      })
      .catch(() => {});
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
            variant="outlined"
            type={values.showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton name="showPassword" aria-label="toggle password visibility" onClick={handleToggle('showPassword')}>
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            value={values.confirm}
            variant="outlined"
            type={values.showPasswordConfirm ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    name="showPasswordConfirm"
                    aria-label="toggle password visibility"
                    onClick={handleToggle('showPasswordConfirm')}
                  >
                    {values.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="outlined" onClick={handleUpdate}>
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
