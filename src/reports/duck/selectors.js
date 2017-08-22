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

export default {
    getNextPendingExpenses,
    getOverdueExpenses,
    getNextPendingIncomes,
    getOverdueIncomes
};