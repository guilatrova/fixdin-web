import { combineReducers } from 'redux';
import { authentication } from './auth/reducers';

const rootReducer = combineReducers({
  auth: authentication
});

export default rootReducer;