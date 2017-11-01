import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route, Router } from 'react-router';

import { isAuthenticated } from './services/session';
import { INCOME, EXPENSE, ALL } from './transactions/kinds';

import { App, DashboardContainer } from './app';
import DashboardPage from './dashboard/containers/DashboardPage';
import LoginPage from './users/containers/LoginPage';
import SignupPage from './users/containers/SignupPage';
import TransactionPage from './transactions/transactions/containers/TransactionPage';
import CategoryPage from  './transactions/categories/containers/CategoryPage';
import PaymentOrderPage from './paymentOrders/containers/PaymentOrderPage';
import CPFLPage from './integrations/CPFL/containers/CPFLSettingsPage';

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

      <Route path='/' component={DashboardContainer} onEnter={requireAuth} >
        <IndexRoute component={DashboardPage} />
        <Route path='/categories/incomes' component={CategoryPage} kind={INCOME} />
        <Route path='/categories/expenses' component={CategoryPage} kind={EXPENSE} />
        <Route path='/transactions' component={TransactionPage} />
        <Route path='/payment-order' component={PaymentOrderPage} />
        <Route path='/cpfl' component={CPFLPage} />
      </Route>      
    </Router>
);
