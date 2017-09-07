import { combineReducers } from 'redux';
import last13Months from './last13MonthsReducer';
import pendingTransactions from './pendingTransactionsReducer';
import valuesByCategory from './valuesByCategoryReducer';

const rootReducer = combineReducers({
    last13Months,
    pendingTransactions,
    valuesByCategory
});

export default rootReducer;