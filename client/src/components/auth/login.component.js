import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../services/authServices';
import Logo from '../../images/logo/logo-gradient.svg';
import './login.component.css';
import Backdrop from '../../layouts/Main/components/Backdrop';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: 70,
    height: 80,
    marginBottom: theme.spacing(1),
  },
  logo: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
    background: 'linear-gradient(to right bottom, #6200ea, #3f51b5)',
  },
  demo: {
    margin: theme.spacing(1, 0, 1),
    background: theme.palette.success.main,
  },
  list: {
    marginTop: theme.spacing(1),
    backgroundColor: '#fffde7',
    color: 'red',
  },
  success: {
    marginTop: theme.spacing(1),
    backgroundColor: '#fffde7',
    color: 'green',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
});

class LoginComponent extends Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      email: '',
      password: '',
      showPassword: false,
      serverError: [],
      loginSuccess: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onToggleShowPassword = this.onToggleShowPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleDemo = this.onHandleDemo.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      window.location.href = './dashboard';
    }
  }

  // Watch props after form is submitted
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      window.location.href = './dashboard';
    }

    if (nextProps.errors) {
      this.setState({
        serverError: nextProps.errors,
      });
    }
  }

  onChange(e) {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onToggleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  _renderServerErrors() {
    return this.state.serverError.map((el) => {
      return (
        <ListItem key={el.msg}>
          <ListItemText disableTypography primary={el.msg} />
        </ListItem>
      );
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email.toLowerCase().trim(),
      password: this.state.password,
    };

    this.props.loginUser(user);
  }

  onHandleDemo(e) {
    e.preventDefault();
    const user = {
      isDemoUser: true,
    };
    this.props.loginUser(user);
  }

  render() {
    const self = this.state;
    return (
      <Container component="main" className={this.props.classes.root}>
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Backdrop />
          <img className={this.props.classes.img} alt="Logo" src={Logo} />
          <Typography component="h1" variant="h2" className="text">
            MERN-Payroll
          </Typography>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={this.props.classes.form} noValidate onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              value={self.email}
              onChange={this.onChange}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={self.password}
              onChange={this.onChange}
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              type={self.showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={this.onToggleShowPassword}>
                      {self.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            {self.serverError.length > 0 && (
              <List dense className={this.props.classes.list}>
                {this._renderServerErrors()}
              </List>
            )}
            {!!self.loginSuccess && (
              <List dense className={this.props.classes.success}>
                <ListItem>
                  <ListItemText disableTypography primary={self.loginSuccess} />
                </ListItem>
              </List>
            )}
            <Button type="submit" fullWidth variant="contained" color="primary" className={this.props.classes.submit}>
              Sign In
            </Button>
            <Divider className={this.props.classes.divider} />
            <Button fullWidth variant="contained" color="primary" className={this.props.classes.demo} onClick={this.onHandleDemo}>
              Try the live demo!
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2" component={RouterLink} to="/register">
                  {"Don't have an account? Register now"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

LoginComponent.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(LoginComponent));
