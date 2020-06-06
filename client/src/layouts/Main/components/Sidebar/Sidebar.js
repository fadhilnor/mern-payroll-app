import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Hidden, IconButton, Typography } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InputIcon from '@material-ui/icons/Input';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import WorkIcon from '@material-ui/icons/Work';
import PeopleIcon from '@material-ui/icons/People';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

import { Profile, SidebarNav } from './components';
import { logoutUser } from '../../../../services/authServices';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  signOutLabel: {
    marginLeft: theme.spacing(1),
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;
  const { user } = useSelector((state) => state.auth);
  let signLabel = user.isDemoUser ? 'Sign In or Register' : 'Sign Out';

  const classes = useStyles();
  const dispatch = useDispatch();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Payrolls',
      href: '/payrolls',
      icon: <LocalAtmIcon />,
    },
    {
      title: 'Employees',
      href: '/employees',
      icon: <PeopleIcon />,
    },
    {
      title: 'Positions',
      href: '/positions',
      icon: <LocalParkingIcon />,
    },
    {
      title: 'Duties',
      href: '/duties',
      icon: <WorkIcon />,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} onClose={onClose} />
        <Hidden mdUp>
          <Divider className={classes.divider} />
          <IconButton color="inherit" onClick={() => dispatch(logoutUser())}>
            <InputIcon />
            <Typography className={classes.signOutLabel} color="inherit" variant="body2">
              {signLabel}
            </Typography>
          </IconButton>
        </Hidden>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
