import types from '../types';

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

export default function reducer(state, action) {
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