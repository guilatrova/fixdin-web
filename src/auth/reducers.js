import { REQUEST_LOGIN, RECEIVE_TOKEN } from './actions';

const initialState = {
    isFetching: false,
    errors: {}
}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
               isFetching: true,
               errors: {}
            });

        case RECEIVE_TOKEN:
            if (action.result === 'success') {
                console.log(action);
                return Object.assign({}, state, {
                    isFetching: false,
                    token: action.token
                });
            }
            else {
                return Object.assign({}, state, {
                    isFetching: false,
                    errors: action.error.data
                });
            }

        default:
            return state;
    }
}