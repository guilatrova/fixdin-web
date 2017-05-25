import { CREATE_TRANSACTION, FETCH_TRANSACTIONS } from './actions';

const initialState = {
    transactions: [],    
    isFetching: false,
    errors: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case CREATE_TRANSACTION:
            if (action.result === 'success') {
                return {
                    ...state,
                    isFetching: false,
                    transactions: state.transactions.concat(action.transaction)
                }
            }
            else if (action.result === 'fail') {
                return {
                    ...state,
                    isFetching: false,
                    errors: action.errors
                }
            }

            return { 
                ...state,
                isFetching: true
            };

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