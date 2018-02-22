import { ALL, INCOME, EXPENSE } from '../../kinds';
import moment from 'moment';
import { filterUniqueStringsArray } from '../../../utils/strings';

const getErrors = (state) => state.transactions.errors;

const getEditingTransaction = (state) => state.transactions.editingTransaction;

const isFetching = (state) => state.transactions.isFetching;

const getTransactionsToDisplay = (state) => {
    if (state.transactions.visibleTransactions) {
        return state.transactions.visibleTransactions
            .map(id => state.transactions.transactions.find(transaction => transaction.id === id))
            .filter(found => found);
    }
    return state.transactions.transactions;
};

const getAllTransactionDescriptions = (state) => filterUniqueStringsArray(state.transactions.transactions.map(t => t.description));

const getVisibleTransactionDescriptions = (state) => filterUniqueStringsArray(getTransactionsToDisplay(state).map(t => t.description));

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

const isFilterActive = (state, key, isDefaultValue) => {
    const filters = getFilters(state);

    if (!(key in filters)) {
        return false;
    }

    if (!filters[key])
        return false;

    if (isDefaultValue && isDefaultValue(filters[key]))
        return false;

    return true;
};

const getActiveFilters = (state) => {
    return {
        kind: isFilterActive(state, "kind", (kind) => kind.value.id === ALL.id),
        due_date: (
            isFilterActive(state, "due_date_from", (from) => from.isSame(moment().startOf('month'))) ||
            isFilterActive(state, "due_date_until", (until) => until.isSame(moment().endOf('month')))
        ),
        description: isFilterActive(state, "description"),
        category: isFilterActive(state, "category", (category) => category.length === 0),
        priority: isFilterActive(state, "priority"),
        deadline: isFilterActive(state, "deadline"),
        payment_date: isFilterActive(state, "payed", (payed) => payed === "-1")
    };
};

const getDisplayedPeriod = (state) => {
    const from = getFilters(state).due_date_from || moment().startOf('month');
    return from.format('MMM/YY');
};

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
    getTotalValueOfDisplayedExpenses,
    getActiveFilters,
    getAllTransactionDescriptions,
    getVisibleTransactionDescriptions,
    getDisplayedPeriod
};