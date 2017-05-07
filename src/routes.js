import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route, Router } from 'react-router';

import { App, Dashboard } from './app';
import Home from './common/components/Home';
import Login from './auth/components/LoginPage';

export default (  
    <Router component={App}>
      <Route path='/login' component={Login} />

      <Route path='/' component={Dashboard} >
        <IndexRoute component={Home} />
      </Route>      
    </Router>
);
