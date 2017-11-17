import { combineReducers } from 'redux';
//import users from '../users/duck';
import transactions from '../transactions/transactions/duck';
import categories from '../transactions/categories/duck';
import balances from '../balances/duck';
//import reports from '../reports/duck';
import paymentOrders from '../paymentOrders/duck';
import integrations from '../integrations/CPFL/duck';

const rootReducer = combineReducers({  
    transactions,
    balances,
    categories,
    paymentOrders,
    integrations
});

export default rootReducer;