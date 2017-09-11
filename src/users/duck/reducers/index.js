import { combineReducers } from 'redux';
import login from './loginReducer';
import signup from './signupReducer';

const rootReducer = combineReducers({
    login,
    signup
});

export default rootReducer;