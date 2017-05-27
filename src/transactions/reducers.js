import { SAVE_TRANSACTION, FETCH_TRANSACTIONS, EDIT_TRANSACTION, FINISH_EDIT_TRANSACTION } from './actions';

const initialState = {
    transactions: [],    
    editingTransaction: {},
    isFetching: false,
    errors: {}
}

function saveReducer(state, action) {
    switch (action.result) {
        case 'success':
            const { transactions } = state;

            const updatedTransaction = transactions.find(item => item.id == action.transaction.id)

            if (updatedTransaction) {
                const index = transactions.indexOf(updatedTransaction);
                
                return {
                    ...state,
                    isFetching: false,
                    transactions: [
                        ...transactions.slice(0, index),
                        action.transaction,
                        ...transactions.slice(index + 1)
                    ]
                }
            }

            return {
                ...state,
                isFetching: false,
                transactions: state.transactions.concat(action.transaction)
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
                isFetching: true
            };
    }            
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SAVE_TRANSACTION:
            return saveReducer(state, action);

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

        case EDIT_TRANSACTION:
            return {
                ...state,
                editingTransaction: state.transactions.find(transaction => transaction.id == action.id)
            }

        case FINISH_EDIT_TRANSACTION:
            return {
                ...state,
                editingTransaction: {}
            }

        default:
            return state;
    }
}