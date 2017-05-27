import { SAVE_TRANSACTION, FETCH_TRANSACTIONS } from './actions';

const initialState = {
    transactions: [],    
    isFetching: false,
    errors: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SAVE_TRANSACTION:
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
                return {
                    ...state,
                    transactions: action.transactions,
                    isFetching: false,
                    errors: {}
                }
            }
            else if (action.result === 'fail') {
                return {
                    ...state,
                    errors: action.errors,
                    isFetching: false
                }
            }

            return  {
                ...state,
                isFetching: true,
                transactions: [],
                errors: {}
            } 

        default:
            return state;
    }
}