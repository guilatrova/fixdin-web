import { combineReducers } from 'redux';
import users from './users/duck';
import transactions from './transactions/transactions/duck';
import categories from './transactions/categories/duck';
import balances from './balances/duck';
import reports from './reports/duck';

const rootReducer = combineReducers({  
  users,
  transactions,
  balances,
  categories,
  reports
});

export default rootReducer;