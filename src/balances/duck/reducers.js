import types from './types';

const initialState = {
    balance: undefined,
    realBalance: undefined,
    expectedBalance: undefined,
    isFetching: false,
    errors: {},
};

export default function reducer(state = initialState, action) {
    if (action.type != types.FETCH_BALANCE) {
        return state;
    }

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
            };

        default:
            return {
                ...state,
                isFetching: true
            };
    }
}