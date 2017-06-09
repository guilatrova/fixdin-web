import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route, Router } from 'react-router';

import { isAuthenticated } from './services/session';
import { INCOME, EXPENSE } from './transactions/kinds';

import { App, Dashboard } from './app';
import Home from './common/components/Home';
import LoginPage from './users/components/LoginPage';
import SignupPage from './users/components/SignupPage';
import TransactionPage from './transactions/transactions/components/TransactionPage';
import CategoryPage from  './transactions/categories/components/CategoryPage';

function isClient() {
   return typeof localStorage != 'undefined';
}

function requireAuth(nextState, replace) {
  if (isClient())
  {
    if (!isAuthenticated()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
}

export default (  
    <Router component={App}>
      <Route path='/login' component={LoginPage} />
      <Route path='/signup' component={SignupPage} />

      <Route path='/' component={Dashboard} onEnter={requireAuth} >
        <IndexRoute component={Home} />
        <Route path='/incomes' component={TransactionPage} kind={INCOME} />
        <Route path='/expenses' component={TransactionPage} kind={EXPENSE} />
        <Route path='/categories/incomes' component={CategoryPage} kind={INCOME} />
        <Route path='/categories/expenses' component={CategoryPage} kind={EXPENSE} />
      </Route>      
    </Router>
);
