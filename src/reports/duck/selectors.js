function getLast13Months(state) {
    return state.reports.last13Months.data.expected;
}

function getRealLast13Months(state) {
    return state.reports.last13Months.data.real;
}

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

export default {
    getLast13Months,
    getRealLast13Months,

    getNextPendingExpenses,
    getOverdueExpenses,
    getNextPendingIncomes,
    getOverdueIncomes,

    getValuesByCategory
};