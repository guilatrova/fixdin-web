import { combineReducers } from 'redux';
import { loginReducer as login, signupReducer as signup } from './users/reducers';
import transactions from './transactions/transactions/reducers';
import categories from './transactions/categories/reducers';

const rootReducer = combineReducers({  
  login,
  signup,
  transactions,
  categories
});

export default rootReducer;