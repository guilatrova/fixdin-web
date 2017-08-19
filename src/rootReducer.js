import { combineReducers } from 'redux';
import { loginReducer as login, signupReducer as signup } from './users/reducers';
import transactions from './transactions/transactions/duck';
import categories from './transactions/categories/reducers';
import balances from './dashboard/duck';

const rootReducer = combineReducers({  
  login,
  signup,
  transactions,
  balances,
  categories
});

export default rootReducer;