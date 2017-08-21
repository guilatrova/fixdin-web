import { combineReducers } from 'redux';
import { loginReducer as login, signupReducer as signup } from './users/reducers';
import transactions from './transactions/transactions/duck';
import categories from './transactions/categories/duck';
import balances from './balances/duck';
import reports from './reports/duck';

const rootReducer = combineReducers({  
  login,
  signup,
  transactions,
  balances,
  categories,
  reports
});

export default rootReducer;