import formatters from '../formatters';

const getChecked = (state) => state.paymentOrders.checked;
const getTotalChecked = (state) => state.paymentOrders.totalChecked;
const getRemainingBalance = (state) => state.paymentOrders.remainingBalance;
const getNextExpenses = (state) => state.paymentOrders.nextExpenses;
const isFetching = (state) => state.paymentOrders.isFetching;
const getSumPendingExpenses = (state) => 
    formatters.reduceNextExpensesToTransactionsArray(state.paymentOrders.nextExpenses)
    .filter(transaction => !transaction.payment_date && transaction.payment_date > transaction.due_date)
    .reduce((total, transaction) => total + transaction.value, 0);

export default {
    getChecked,
    getTotalChecked,
    getRemainingBalance,
    getNextExpenses,
    getSumPendingExpenses,
    isFetching
};