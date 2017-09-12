import types from '../types';

const initialState = {
    isFetching: false,
    error: '',
    token: ''
}

export default function reducer(state = initialState, action) {
    if (action.type != types.FETCH_TOKEN)
        return state;

    switch (action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false,
                token: action.token,
                error: ''
            }
            
        case 'fail':
            return {
                ...state,
                isFetching: false,
                error: action.error,
                token: ''
            }            
            
        default: 
            return {
                ...state,
                isFetching: true
            }
    }
}