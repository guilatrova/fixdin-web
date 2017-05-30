import { combineReducers } from 'redux';
import { loginReducer as login, signupReducer as signup } from './auth/reducers';
import transactions from './transactions/reducers';

const rootReducer = combineReducers({  
  login,
  signup,
  transactions
});

export default rootReducer;