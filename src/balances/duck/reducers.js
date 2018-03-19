import types from './types';

const initialState = {
    balance: null,
    realBalance: null,
    expectedBalance: null,
    pendingIncomes: null,
    isFetching: false,
    errors: {},
};

const fetchBalance = (state, action, key) => {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                [key]: action.balance,
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

        default:
            return state;
    }
}