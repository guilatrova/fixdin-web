import commonSelectors from '../../common/duck/selectors';

const getPeriod = (state) => state.paymentOrders.period;
const getChecked = (state) => state.paymentOrders.checked;
const getSuggested = (state) => state.paymentOrders.suggested;
const getTotalChecked = (state) => state.paymentOrders.totalChecked;
const getRemainingBalance = (state) => state.paymentOrders.remainingBalance;
const getNextExpenses = (state) => state.paymentOrders.nextExpenses;
const getYearBalance = (state) => state.paymentOrders.yearBalance;
const isFetching = (state, type) => commonSelectors.isFetching(state.accounts, type);

export default {
    getPeriod,
    getChecked,
    getSuggested,
    getTotalChecked,
    getRemainingBalance,
    getNextExpenses,
    getYearBalance,
    isFetching
};
