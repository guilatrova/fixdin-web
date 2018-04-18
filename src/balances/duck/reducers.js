import types from './types';
import specifications from '../specifications';

const initialState = {
    plain: [],
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

const fetchPlainBalance = (state, action) => {
    /* eslint-disable no-unused-vars */
    const { type, result, errors, balance, ...options } = action;
    
    switch (result) {
        case 'success': {
            const plain = state.plain;
            const updatedPlain = plain.find(balance => specifications.isSameBalance(balance, options));
            const newPlainBalance = { balance: action.balance, ...options };

            if (updatedPlain) {
                const index = plain.indexOf(updatedPlain);

                return {
                    ...state,
                    isFetching: false,
                    plain: [
                        ...plain.slice(0, index),
                        newPlainBalance,
                        ...plain.slice(index + 1)
                    ]
                };
            }

            return {
                ...state,
                isFetching: false,
                plain: plain.concat(newPlainBalance)
            };
        }

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors,
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
        case types.FETCH_PLAIN_BALANCE:
            return fetchPlainBalance(state, action);

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