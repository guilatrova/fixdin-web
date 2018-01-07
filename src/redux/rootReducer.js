import { combineReducers } from 'redux';
import app from '../app/duck';
import users from '../users/duck';
import transactions from '../transactions/transactions/duck';
import categories from '../transactions/categories/duck';
import accounts from '../transactions/accounts/duck';
import balances from '../balances/duck';
import reports from '../reports/duck';
import paymentOrders from '../paymentOrders/duck';
import integrations from '../integrations/CPFL/duck';

const rootReducer = combineReducers({
    app,
    users,
    transactions,
    accounts,
    balances,
    categories,
    paymentOrders,
    integrations,
    reports
});

export default rootReducer;