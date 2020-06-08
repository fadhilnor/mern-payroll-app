import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../services/authServices';
import Logo from '../../images/logo/logo-gradient.svg';
import './register.component.css';
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
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(to right bottom, #6200ea, #3f51b5)',
  },
  list: {
    marginTop: theme.spacing(1),
    backgroundColor: '#fffde7',
    color: 'red',
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      emailErrorText: '',
      showPassword: false,
      showPasswordConfirm: false,
      serverError: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onToggleShowPassword = this.onToggleShowPassword.bind(this);
    this.onToggleShowPasswordConfrim = this.onToggleShowPasswordConfrim.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      window.location.href = './dashboard';
    }
  }

  // Watch props state changes
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

  onChangeEmail(e) {
    e.persist();
    if (
      e.target.value.length === 0 ||
      e.target.value.match(
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.setState({
        errors: this.state.errors.filter((e) => e !== 'email'),
        email: e.target.value,
        emailErrorText: '',
      });
    } else {
      this.setState({
        errors: [...this.state.errors, 'email'],
        email: e.target.value,
        emailErrorText: 'Email address is not vaild',
      });
    }
  }

  onToggleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  onToggleShowPasswordConfrim() {
    this.setState({
      showPasswordConfirm: !this.state.showPasswordConfirm,
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

    let self = this.state;
    const newUser = {
      name: self.name,
      email: self.email.toLowerCase().trim(),
      password: self.password,
      passwordConfirm: self.passwordConfirm,
    };

    this.props.registerUser(newUser);
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
            Register
          </Typography>
          <form className={this.props.classes.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  value={self.name}
                  onChange={this.onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={self.email}
                  onChange={this.onChangeEmail}
                  error={!!self.emailErrorText}
                  helperText={self.emailErrorText}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={self.password}
                  onChange={this.onChange}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={self.passwordConfirm}
                  onChange={this.onChange}
                  fullWidth
                  name="passwordConfirm"
                  label="Confirm Password"
                  id="passwordConfirm"
                  autoComplete="current-password"
                  type={self.showPasswordConfirm ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={this.onToggleShowPasswordConfrim}>
                          {self.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {self.serverError.length > 0 && (
              <List dense className={this.props.classes.list}>
                {this._renderServerErrors()}
              </List>
            )}
            <Button type="submit" fullWidth variant="contained" color="primary" className={this.props.classes.submit}>
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2" component={RouterLink} to="/">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withStyles(styles)(Register));
