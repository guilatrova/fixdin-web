import { INCOME, EXPENSE } from '../../kinds';

const getErrors = (state) => state.transactions.errors;

const getEditingTransaction = (state) => state.transactions.editingTransaction;

const isFetching = (state) => state.transactions.isFetching;

const getTransactionsToDisplay = (state) => {
    if (state.transactions.visibleTransactions) {
        return state.transactions.visibleTransactions
            .map(id => state.transactions.transactions.find(transaction => transaction.id === id));
    }
    return state.transactions.transactions;
};

const getPendingTransactionsUntil = (state, until) => {
    const pending = state.transactions.transactions.filter(transaction => !transaction.payment_date);

    if (until) {
        return pending.filter(income => income.due_date.isSameOrBefore(until));
    }

    return pending;
};

const getPendingIncomesUntil = (state, until) => 
    getPendingTransactionsUntil(state, until).filter(transaction => transaction.kind == INCOME.id);

const getPendingExpensesUntil = (state, until) => 
    getPendingTransactionsUntil(state, until).filter(transaction => transaction.kind == EXPENSE.id);

const getFilters = (state) => state.transactions.filters;

const getVisibleDeadlines = (state) => getTransactionsToDisplay(state).map(transaction => transaction.deadline.toString());

const getVisiblePriorities = (state) => getTransactionsToDisplay(state).map(transaction => transaction.priority.toString());

const sumTransactions = (transactions) =>
    transactions.map(x => x.value).reduce((total, value) => total + value, 0);

const getTotalValueOfDisplayedTransactions = (state) =>
    sumTransactions(getTransactionsToDisplay(state));

const getTotalValueOfDisplayedExpenses = (state) =>
    sumTransactions(getTransactionsToDisplay(state).filter(t => t.kind === EXPENSE.id));

const getTotalValueOfDisplayedIncomes = (state) =>
    sumTransactions(getTransactionsToDisplay(state).filter(t => t.kind === INCOME.id));

export default {
    getErrors,
    isFetching,
    getTransactionsToDisplay,
    getEditingTransaction,
    getPendingTransactionsUntil,
    getPendingIncomesUntil,
    getPendingExpensesUntil,
    getFilters,
    getVisibleDeadlines,
    getVisiblePriorities,
    getTotalValueOfDisplayedTransactions,
    getTotalValueOfDisplayedIncomes,
    getTotalValueOfDisplayedExpenses
};