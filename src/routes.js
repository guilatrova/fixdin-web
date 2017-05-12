import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route, Router } from 'react-router';

import { App, Dashboard } from './app';
import Home from './common/components/Home';
import LoginPage from './auth/components/LoginPage';
import Signup from './auth/components/SignupPage';

export default (  
    <Router component={App}>
      <Route path='/login' component={LoginPage} />
      <Route path='/signup' component={Signup} />

      <Route path='/' component={Dashboard} >
        <IndexRoute component={Home} />
      </Route>      
    </Router>
);
