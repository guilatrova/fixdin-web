import types from '../types';

const initialState = {
    isFetching: false,
    errors: {}
}

export default function reducer(state = initialState, action) {
    if (action.type != types.SIGNUP)
        return state;    

    switch (action.result) {

        case 'success':
            return {
                ...state,
                isFetching: false,
                errors: {}
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
                isFetching: true,
                errors: {}
            }
    }
}