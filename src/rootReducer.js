import { combineReducers } from 'redux';
import { authentication } from './auth/reducers';
import { transactions } from './transactions/reducers';

const rootReducer = combineReducers({
  auth: authentication,
  transactions
});

export default rootReducer;