import { combineReducers } from 'redux';
import { loginReducer as login, signupReducer as signup } from './auth/reducers';
import transactions from './transactions/reducers';
import categories from './categories/reducers';

const rootReducer = combineReducers({  
  login,
  signup,
  transactions,
  categories
});

export default rootReducer;