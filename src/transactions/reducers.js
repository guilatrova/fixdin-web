import { 
    SAVE_TRANSACTION, 
    FETCH_TRANSACTIONS, 
    EDIT_TRANSACTION, 
    FINISH_EDIT_TRANSACTION,
    DELETE_TRANSACTION
} from './actions';

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

function deleteReducer(state, action) {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false,
                transactions: state.transactions.filter(transaction => transaction.id != action.id)
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
            }
    }            
}

function fetchReducer(state, action) {
    switch (action.result) {

        case 'success':

            return {
                ...state,                
                isFetching: false,
                errors: {},
                transactions: state.transactions
                    .filter(old => !action.transactions.some(newT => newT.id == old.id))
                    .concat(action.transactions)
            }
        
        case 'fail':
            return {
                ...state,
                errors: action.errors,
                isFetching: false
            }    

        default:
            return {
                ...state,
                isFetching: true,
                errors: {}
            }
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SAVE_TRANSACTION:
            return saveReducer(state, action);

        case FETCH_TRANSACTIONS:
            return fetchReducer(state, action);

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

        case DELETE_TRANSACTION:
            return deleteReducer(state, action);

        default:
            return state;
    }
}