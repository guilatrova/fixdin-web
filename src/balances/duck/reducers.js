import types from './types';

const initialState = {
    balance: null,
    realBalance: null,
    expectedBalance: null,
    pendingIncomes: null,
    pendingExpenses: null,
    accumulatedBalance: null,
    detailedAccounts: [],
    isFetching: false,
    errors: {},
};

const fetchBalance = (state, action, key, actionKey='balance') => {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                [key]: action[actionKey],
                errors: {},
                isFetching: false
            };

        case 'fail':
            return {
                ...state,
                errors: action.errors,
                isFetching: false
            };

        default:
            return {
                ...state,
                isFetching: true
            };
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_BALANCE:
            return fetchBalance(state, action, action.key);

        case types.FETCH_PENDING_INCOMES_BALANCES:
            return fetchBalance(state, action, 'pendingIncomes');

        case types.FETCH_PENDING_EXPENSES_BALANCES:
            return fetchBalance(state, action, 'pendingExpenses');

        case types.FETCH_DETAILED_ACCOUNTS_BALANCE:
            return fetchBalance(state, action, 'detailedAccounts', 'balances');

        case types.FETCH_DETAILED_ACCUMULATED_BALANCE:
            return fetchBalance(state, action, 'accumulatedBalance');

        default:
            return state;
    }
}