const getBalance = (state) => state.balances.balance;
const getRealBalance = (state) => state.balances.realBalance;
const getExpectedBalance = (state) => state.balances.expectedBalance;
const getPendingIncomesBalance = (state) => state.balances.pendingIncomes;
const getPendingExpensesBalance = (state) => state.balances.pendingExpenses;
const getDetailedAccounts = (state) => state.balances.detailedAccounts;
const getTotalsDetailedAccounts = (state) => {
    const detailedAccounts = getDetailedAccounts(state);
    return detailedAccounts.reduce((prev, detailedAccount) => {
        prev.incomes += detailedAccount.incomes;
        prev.expenses += detailedAccount.expenses;
        prev.total += detailedAccount.total;

        return prev;
    }, {
        incomes: 0,
        expenses: 0,
        total: 0
    });
};
const getAccumulatedBalance = (state) => state.balances.accumulatedBalance;

const isFetching = (state) => state.balances.isFetching;

export default {
    getBalance,
    getRealBalance,
    getExpectedBalance,
    getPendingIncomesBalance,
    getPendingExpensesBalance,
    getDetailedAccounts,
    getTotalsDetailedAccounts,
    getAccumulatedBalance,
    isFetching
};