import { AUTH_FETCH_TOKEN, AUTH_REQUEST_SIGNUP } from './actions';

const initialState = {
    login : {
        isFetching: false,
        errors: {}
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