import types from './types';

const initialState = {
    balance: undefined,
    isFetching: false,
    errors: {},
}

function fetchReducer(state, action) {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                balance: action.balance,
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
            return fetchReducer(state, action);

        default:
            return state;
    }
}