import { combineReducers } from 'redux'
import types from './types';
import { EXPENSE } from '../../transactions/kinds';

const last13MonthsInitialState = {
    isFetching: false,
    data: [],
    errors: {}
};

function last13MonthsReducer(state = last13MonthsInitialState, action) {
    if (action.type != types.FETCH_LAST_13_MONTHS) 
        return state;

    switch (action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false,
                data: action.data,
                errors: {}
            };

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors: action.errors
            };

        default:
            return {
                ...state,
                isFetching: true
            };
    }
}

const pendingTransactionsInitialState = {
    isFetching: false,
    expenses: {
        next: [],
        overdue: []
    },
    incomes: {
        next: [],
        overdue: []
    },
    errors: {}
};

function pendingTransactionsReducer(state = pendingTransactionsInitialState, action) {
    if (action.type != types.FETCH_PENDING_EXPENSES) {
        return state;
    }

    switch(action.result) {
        case 'success':
            const kind = (action.kind.id == EXPENSE.id) ? 'expenses' : 'incomes';

            return {
                ...state,
                isFetching: false,
                errors: {},
                [kind]: action.data
            }

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors: action.errors
            }

        default:
            return {
                ...state,
                isFetching: true
            }
    }
}

const rootReducer = combineReducers({
    last13Months: last13MonthsReducer,
    pendingTransactions: pendingTransactionsReducer
});

export default rootReducer;