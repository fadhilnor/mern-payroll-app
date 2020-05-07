import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route/privateroute';
import PublicRoute from './components/public-route/publicroute';
import MainLayout from './layouts/Main/Main';

import { Dashboard as DashboardView, Settings as SettingsView } from './views';

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={PublicRoute} />
      <Route exact path="/register" component={PublicRoute} />
      <Switch>
        <PrivateRoute component={DashboardView} layout={MainLayout} exact path="/dashboard" />
        <PrivateRoute component={SettingsView} layout={MainLayout} exact path="/settings" />
      </Switch>
    </Router>
  );
};

export default Routes;
