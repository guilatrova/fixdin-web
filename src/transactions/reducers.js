import { CREATE_TRANSACTION, FETCH_TRANSACTIONS } from './actions';

const initialState = {
    page: { 
        isFetching: false,
        transactions: [],
        errors: {}
    },
    form: {
        isFetching: false,
        errors: {}
    }
}

export function transactions(state = initialState, action) {
    switch (action.type) {

        case CREATE_TRANSACTION:
            if (action.result === 'success') {
                return Object.assign({}, state, { form: initialState.form })
            }
            else if (action.result === 'fail') {
                return Object.assign({}, state, {
                    form: {
                        errors: action.errors,
                        isFetching: false
                    }
                });
            }

            return Object.assign({}, state, { 
                form: {
                    isFetching: true
                } 
            });

        case FETCH_TRANSACTIONS:
            if (action.result === 'success') {
                return Object.assign({}, state, { 
                    page: {
                        transactions: action.transactions,
                        isFetching: false
                    }
                });
            }
            else if (action.result === 'fail') {
                return Object.assign({}, state, {
                    page: {
                        errors: action.errors,
                        isFetching: false,
                        transactions: []
                    }
                });
            }

            return Object.assign({}, state, { 
                page: {
                    isFetching: true,
                    transactions: []
                } 
            });

        default:
            return state;
    }
}