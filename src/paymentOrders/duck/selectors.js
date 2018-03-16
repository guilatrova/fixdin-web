import formatters from '../formatters';
import transactionsFilters from '../../transactions/transactions/filters';

const getPeriod = (state) => state.paymentOrders.period;
const getChecked = (state) => state.paymentOrders.checked;
const getTotalChecked = (state) => state.paymentOrders.totalChecked;
const getRemainingBalance = (state) => state.paymentOrders.remainingBalance;
const getNextExpenses = (state) => state.paymentOrders.nextExpenses;
const isFetching = (state) => state.paymentOrders.isFetching;
const getSumOverdueExpenses = (state) => 
    formatters.reduceNextExpensesToTransactionsArray(state.paymentOrders.nextExpenses)
    .filter(transactionsFilters.overdue)
    .reduce((total, transaction) => total + transaction.value, 0);

export default {
    getPeriod,
    getChecked,
    getTotalChecked,
    getRemainingBalance,
    getNextExpenses,
    getSumOverdueExpenses,
    isFetching
};