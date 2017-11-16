import { combineReducers } from 'redux';
import step1 from './step1Reducer';
import step2 from './step2Reducer';

const rootReducer = combineReducers({
    step1,
    step2
});

export default rootReducer;