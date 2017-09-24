import types from './types';

const initialState = {
    balance: undefined,
    realBalance: undefined,
    expectedBalance: undefined,
    isFetching: false,
    errors: {},
};

function fetchBalanceReducer(state, action) {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                [action.key]: action.balance,
                errors: {},
                isFetching: false
            };

        case 'fail':
            return {
                ...state,
                errors: action.errors,
                isFetching: false
            }

        default:
            return {
                ...state,
                isFetching: true
            };
    }
}

function fetchRealBalanceReducer(state, action) {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                realBalance: action.balance,
                errors: {},
                isFetching: false
            };

        case 'fail':
            return {
                ...state,
                errors: action.errors,
                isFetching: false
            }

        default:
            return {
                ...state,
                isFetching: true
            };
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_BALANCE:
            return fetchBalanceReducer(state, action);

        case types.FETCH_REAL_BALANCE:
            return fetchRealBalanceReducer(state, action);

        default:
            return state;
    }
}