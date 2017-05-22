import { AUTH_FETCH_TOKEN } from './actions';

const initialState = {
    isFetching: false,
    errors: {}
}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case AUTH_FETCH_TOKEN:
            if (action.result === 'success') {
                console.log(action);
                return Object.assign({}, state, {
                    isFetching: false,
                    token: action.token
                });
            }
            else if (action.result === 'fail') {
                return Object.assign({}, state, {
                    isFetching: false,
                    errors: action.errors.data
                });
            }

            return Object.assign({}, state, {
               isFetching: true,
               errors: {}
            });

        default:
            return state;
    }
}