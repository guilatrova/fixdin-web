const getChecked = (state) => state.paymentOrders.checked;
const getTotalChecked = (state) => state.paymentOrders.totalChecked;
const getRemainingBalance = (state) => state.paymentOrders.remainingBalance;
const getNextExpenses = (state) => state.paymentOrders.nextExpenses;
const isFetching = (state) => state.paymentOrders.isFetching;

export default {
    getChecked,
    getTotalChecked,
    getRemainingBalance,
    getNextExpenses,
    isFetching
};