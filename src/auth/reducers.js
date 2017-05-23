import { AUTH_FETCH_TOKEN, AUTH_REQUEST_SIGNUP } from './actions';

const initialState = {
    login : {
        isFetching: false,
        error: '',
        token: ''
    },
    signup : {
        isFetching: false,
        errors: {}
    }
}

function authenticationArea(state, action, keyArea) {
    switch (action.result) {
        case 'success':
            return Object.assign({}, state, { 
                [keyArea]: {
                    isFetching: false,
                    errors: {},
                    token: action.token //only for login
                }
            });

        case 'fail':
            return Object.assign({}, state, {
                [keyArea]: {
                    isFetching: false,
                    errors: action.errors.data
                }
            });

        default:
            return Object.assign({}, state, {
                [keyArea]: {
                    isFetching: true,
                    errors: {}
                }
            });
    }
}

export function authentication(state = initialState, action) {
    switch (action.type) {

        case AUTH_REQUEST_SIGNUP:
            return authenticationArea(state, action, 'signup');

        case AUTH_FETCH_TOKEN:
            return authenticationArea(state, action, 'login');

        default:
            return state;
    }
}

export function loginReducer(state = initialState.login, action) {
    switch (action.type) {
        
        case AUTH_FETCH_TOKEN:
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