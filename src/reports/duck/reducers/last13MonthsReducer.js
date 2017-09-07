import types from '../types';

const initialState = {
    isFetching: false,
    data: {
        expected: [],
        real: [],
    },    
    errors: {}
};

export default function reducer(state = initialState, action) {
    if (action.type != types.FETCH_LAST_13_MONTHS) 
        return state;

    const dataKey = action.real ? 'real' : 'expected';

    switch (action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false,
                data: {
                    ...state.data,
                    [dataKey]: action.data
                },
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