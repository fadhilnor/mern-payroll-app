import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route/privateroute';
import PublicRoute from './components/public-route/publicroute';
import MainLayout from './layouts/Main/Main';

import {
  Dashboard as DashboardView,
  Payroll as PayrollView,
  Settings as SettingsView,
  PositionList as PositionListView,
  DutyList as DutyListView,
  EmployeeList as EmployeeListView,
} from './views';

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={PublicRoute} />
      <Route exact path="/register" component={PublicRoute} />
      <Switch>
        <PrivateRoute component={DashboardView} layout={MainLayout} exact path="/dashboard" />
        <PrivateRoute component={PayrollView} layout={MainLayout} exact path="/payrolls" />
        <PrivateRoute component={SettingsView} layout={MainLayout} exact path="/settings" />
        <PrivateRoute component={PositionListView} layout={MainLayout} exact path="/positions" />
        <PrivateRoute component={DutyListView} layout={MainLayout} exact path="/duties" />
        <PrivateRoute component={EmployeeListView} layout={MainLayout} exact path="/employees" />
      </Switch>
    </Router>
  );
};

export default Routes;
