import { combineReducers } from 'redux';
import { loginReducer as login, signupReducer as signup } from './users/reducers';
import transactions from './transactions/transactions/reducers';
import categories from './transactions/categories/reducers';
import balances from './dashboard/ducks';

const rootReducer = combineReducers({  
  login,
  signup,
  transactions,
  balances,
  categories
});

export default rootReducer;