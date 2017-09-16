import types from './types';

const initialState = {
    transactions: [],
    editingTransaction: {},
    isFetching: false,
    errors: {}
}

function updateTransactions(state, transaction) {
    const { transactions } = state;
    const updatedTransaction = transactions.find(item => item.id == transaction.id);
    
    if (updatedTransaction) {
        const index = transactions.indexOf(updatedTransaction);
        
        return {
            ...state,
            isFetching: false,
            transactions: [
                ...transactions.slice(0, index),
                transaction,
                ...transactions.slice(index + 1)
            ]
        }
    }

    return {
        ...state,
        isFetching: false,
        transactions: state.transactions.concat(transaction)
    }
    
}

function saveReducer(state, action) {
    switch (action.result) {
        case 'success':
            let newState = { ...state };
            for (let i = 0; i < action.transactions.length; i++) {
                newState = updateTransactions(newState, action.transactions[i]);
            }
            return newState;
            
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

const filterDeletedTransactions = (transactions, action) => {
    switch (action.type) {
        case types.DELETE_ALL_PERIODIC_TRANSACTIONS:
            return transactions.filter(transaction => transaction.periodic_transaction != action.id);

        case types.DELETE_THIS_AND_NEXT_TRANSACTIONS:
            const afterThis = transactions.find(transaction => transaction.id == action.id);
            return transactions.filter(transaction => !(transaction.periodic_transaction == afterThis.periodic_transaction && transaction.id >= afterThis.id));

        case types.DELETE_TRANSACTION:
            return transactions.filter(transaction => transaction.id != action.id);

        default:
            return transactions;
    }
}

function deleteReducer(state, action) {
    switch (action.result) {
        case 'success':            
            return {
                ...state,
                isFetching: false,
                transactions: filterDeletedTransactions(state.transactions, action)
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

function copyTransaction(state, action) {
    const originalTransaction = state.transactions.find(transaction => transaction.id == action.id);
    const { id, ...transactionWithoutId } = originalTransaction;
    const copy = {        
        ...transactionWithoutId
    };

    return {
        ...state,
        editingTransaction: copy
    };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case types.SAVE_TRANSACTION:
            return saveReducer(state, action);

        case types.FETCH_TRANSACTIONS:
            return fetchReducer(state, action);

        case types.COPY_TRANSACTION:
            return copyTransaction(state, action);

        case types.EDIT_TRANSACTION:
            return {
                ...state,
                editingTransaction: state.transactions.find(transaction => transaction.id == action.id)
            }

        case types.FINISH_EDIT_TRANSACTION:
            return {
                ...state,
                editingTransaction: {},
                errors: {}
            }

        case types.DELETE_TRANSACTION:
        case types.DELETE_THIS_AND_NEXT_TRANSACTIONS:
        case types.DELETE_ALL_PERIODIC_TRANSACTIONS:
            return deleteReducer(state, action);

        default:
            return state;
    }
}