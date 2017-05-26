import { combineReducers } from 'redux';
import { authentication, loginReducer } from './auth/reducers';
import transactions from './transactions/reducers';

const rootReducer = combineReducers({
  auth: {
    login: loginReducer,
    signup: authentication
  },
  login: loginReducer,
  transactions
});

export default rootReducer;