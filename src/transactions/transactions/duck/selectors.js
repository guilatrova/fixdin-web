import comparators from './comparators';
import { INCOME } from '../../kinds';

const getErrors = (state) => state.transactions.errors;

const getEditingTransaction = (state) => state.transactions.editingTransaction;

const isFetching = (state) => state.transactions.isFetching;

const getTransactionsToDisplay = (state) => {
    if (state.transactions.visibleTransactions) {
        return state.transactions.visibleTransactions;
    }
    return state.transactions.transactions
};

const getPendingIncomesUntil = (state, until) => {    
    const pending = state.transactions.transactions.filter(transaction => 
        transaction.kind == INCOME.id && !transaction.payment_date);

    if (until) {
        return pending.filter(income => income.due_date.isSameOrBefore(until));
    }

    return pending;
}

export default {
    getErrors,
    isFetching,
    getTransactionsToDisplay,
    getEditingTransaction,
    getPendingIncomesUntil
};