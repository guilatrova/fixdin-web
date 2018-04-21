const getPeriod = (state) => state.paymentOrders.period;
const getChecked = (state) => state.paymentOrders.checked;
const getTotalChecked = (state) => state.paymentOrders.totalChecked;
const getRemainingBalance = (state) => state.paymentOrders.remainingBalance;
const getNextExpenses = (state) => state.paymentOrders.nextExpenses;
const getYearBalance = (state) => state.paymentOrders.yearBalance;
const isFetching = (state) => state.paymentOrders.isFetching;

export default {
    getPeriod,
    getChecked,
    getTotalChecked,
    getRemainingBalance,
    getNextExpenses,
    getYearBalance,
    isFetching
};