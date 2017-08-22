import { combineReducers } from 'redux'
import types from './types';

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
            return {
                ...state,
                isFetching: false,
                errors: {},
                [action.kind.apiEndpoint]: action.data
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