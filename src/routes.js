import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route, Router } from 'react-router';

import { App, Dashboard } from './app';
import Home from './common/components/Home';
import LoginPage from './auth/components/LoginPage';
import SignupPage from './auth/components/SignupPage';
import TransactionPage from './transactions/components/TransactionPage';
import { INCOME, EXPENSE } from './transactions/kinds';

export default (  
    <Router component={App}>
      <Route path='/login' component={LoginPage} />
      <Route path='/signup' component={SignupPage} />

      <Route path='/' component={Dashboard} >
        <IndexRoute component={Home} />
        <Route path='/incomes' component={TransactionPage} kind={INCOME} />
        <Route path='/expenses' component={TransactionPage} kind={EXPENSE} />
      </Route>      
    </Router>
);
