import types from '../types';

const initialState = {
    isFetching: false,
    data: [],
    errors: {}
};

export default function reducer(state = initialState, action) {
    if (action.type != types.FETCH_LAST_MONTHS) 
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