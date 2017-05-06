import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route, Router } from 'react-router';

import { App, Dashboard } from './app';
import Home from './common/home';
import Login from './auth/components/login';

export default (  
    <Router component={App}>
      <Route path='/'>
        <IndexRoute component={Dashboard} />
      </Route>

      <Route path='/login' component={Login} />
    </Router>
);
