import types from '../types';
import { types as accountTypes } from '../../../accounts/duck';

const filterDeletedTransactions = (transactions, action) => {
    switch (action.type) {
        case types.DELETE_ALL_PERIODIC_TRANSACTIONS:
            return transactions.filter(transaction => transaction.bound_transaction != action.id);

        case types.DELETE_THIS_AND_NEXT_TRANSACTIONS: {
            const afterThis = transactions.find(transaction => transaction.id == action.id);
            return transactions.filter(transaction => !(transaction.bound_transaction == afterThis.bound_transaction && transaction.id >= afterThis.id));
        }

        case types.DELETE_TRANSACTION:
            return transactions.filter(transaction => transaction.id != action.id);

        case accountTypes.DELETE_TRANSFER: {
            const transfer = transactions.find(transaction => transaction.id == action.id);
            if (transfer) { //Sometimes transfer doesn't exists as transactions yet
                const pairId = transfer.bound_transaction;
                return transactions.filter(transaction => transaction.id != transfer.id && transaction.id != pairId);
            }

            return transactions;
        }

        default:
            return transactions;
    }
};

export default function reducer(state, action) {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false,
                transactions: filterDeletedTransactions(state.transactions, action)
            };

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors: action.errors
            };

        default:
            return {
                ...state,
                isFetching: true
            };
    }
}