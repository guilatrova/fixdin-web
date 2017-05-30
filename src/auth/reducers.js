import { FETCH_TOKEN, SIGNUP } from './actions';

const loginInitialState = {
    isFetching: false,
    error: '',
    token: ''
}

const signupInitialState = {
    isFetching: false,
    errors: {}
}

export function signupReducer(state = signupInitialState, action) {
    switch (action.type) {

        case SIGNUP:
            if (action.result == 'success') {
                return {
                    ...state,
                    isFetching: false,
                    errors: {}
                }
            }
            else if (action.result == 'fail') {
                return {
                    ...state,
                    isFetching: false,
                    errors: action.errors
                }
            }

            return {
                ...state,
                isFetching: true,
                errors: {}
            }

        default:
            return state;
    }
}

export function loginReducer(state = loginInitialState, action) {
    switch (action.type) {
        
        case FETCH_TOKEN:
            if (action.result === 'success') {
                return {
                    ...state,
                    isFetching: false,
                    token: action.token,
                    error: ''
                };
            }
            else if(action.result === 'fail') {
                return {
                    ...state,
                    isFetching: false,
                    error: action.error,
                    token: ''
                }
            }
            
            return {
                ...state,
                isFetching: true
            }

        default:
            return state;
    }
}