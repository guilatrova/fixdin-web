import comparators from '../comparators';
import { INCOME, EXPENSE } from '../../kinds';

const getErrors = (state) => state.transactions.errors;

const getEditingTransaction = (state) => state.transactions.editingTransaction;

const isFetching = (state) => state.transactions.isFetching;

const getTransactionsToDisplay = (state) => {
    if (state.transactions.visibleTransactions) {
        return state.transactions.visibleTransactions;
    }
    return state.transactions.transactions
};

const getPendingTransactionsUntil = (state, until) => {
    const pending = state.transactions.transactions.filter(transaction => !transaction.payment_date);

    if (until) {
        return pending.filter(income => income.due_date.isSameOrBefore(until));
    }

    return pending;
}

const getPendingIncomesUntil = (state, until) => 
    getPendingTransactionsUntil(state, until).filter(transaction => transaction.kind == INCOME.id);

const getPendingExpensesUntil = (state, until) => 
    getPendingTransactionsUntil(state, until).filter(transaction => transaction.kind == EXPENSE.id);

export default {
    getErrors,
    isFetching,
    getTransactionsToDisplay,
    getEditingTransaction,
    getPendingTransactionsUntil,
    getPendingIncomesUntil,
    getPendingExpensesUntil
};