const getBalance = (state) => state.balances.balance;
const getRealBalance = (state) => state.balances.realBalance;
const getExpectedBalance = (state) => state.balances.expectedBalance;
const getPendingIncomesBalance = (state) => state.balances.pendingIncomes;
const isFetching = (state) => state.balances.isFetching;

export default {
    getBalance,
    getRealBalance,
    getExpectedBalance,
    getPendingIncomesBalance,
    isFetching
};