const getLastMonths = (state) =>
    state.reports;

function getNextPendingExpenses(state) {
    return state.reports.pendingTransactions.expenses.next;
}

function getOverdueExpenses(state) {
    return state.reports.pendingTransactions.expenses.overdue;
}

function getNextPendingIncomes(state) {
    return state.reports.pendingTransactions.incomes.next;
}

function getOverdueIncomes(state) {
    return state.reports.pendingTransactions.incomes.overdue;
}

function getValuesByCategory(state) {
    return state.reports.valuesByCategory;
}

const getIncomesByCategory = state => getValuesByCategory(state).incomes.data;

const getExpensesByCategory = state => getValuesByCategory(state).expenses.data;

export default {
    getLastMonths,

    getNextPendingExpenses,
    getOverdueExpenses,
    getNextPendingIncomes,
    getOverdueIncomes,

    getValuesByCategory,
    getIncomesByCategory,
    getExpensesByCategory
};