const buildChartData = (data, yProp, allowNegative=false) => data.map(item => (
    { x: item['period'], y: item[yProp] >= 0 ? parseInt(item[yProp]) : allowNegative ? parseInt(item[yProp]) : -item[yProp] })
);

const getLastMonths = (state) => state.reports.lastMonths.data;

const getLastMonthsChart = (state) => {
    const data = state.reports.lastMonths.data;
    return {
        effectiveIncomes: buildChartData(data, 'effective_incomes'),
        effectiveExpenses: buildChartData(data, 'effective_expenses'),
        realIncomes: buildChartData(data, 'real_incomes'),
        realExpenses: buildChartData(data, 'real_expenses'),
        effectiveTotal: buildChartData(data, 'effective_total', true),
        periods: data.map(item => item.period)
    };
};

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
    getLastMonthsChart,

    getNextPendingExpenses,
    getOverdueExpenses,
    getNextPendingIncomes,
    getOverdueIncomes,

    getValuesByCategory,
    getIncomesByCategory,
    getExpensesByCategory
};