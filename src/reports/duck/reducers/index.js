import { combineReducers } from 'redux';
import lastMonths from './lastMonthsReducer';
import pendingTransactions from './pendingTransactionsReducer';
import valuesByCategory from './valuesByCategoryReducer';

const rootReducer = combineReducers({
    lastMonths,
    pendingTransactions,
    valuesByCategory
});

export default rootReducer;