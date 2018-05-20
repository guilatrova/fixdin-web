import commonSelectors from '../../common/duck/selectors';

const getPeriod = (state) => state.paymentOrders.period;
const getChecked = (state) => state.paymentOrders.checked;
const getTotalChecked = (state) => state.paymentOrders.totalChecked;
const getRemainingBalance = (state) => state.paymentOrders.remainingBalance;
const getNextExpenses = (state) => state.paymentOrders.nextExpenses;
const getYearBalance = (state) => state.paymentOrders.yearBalance;
const isFetching = (state, type) => commonSelectors.isFetching(state.accounts, type);

export default {
    getPeriod,
    getChecked,
    getTotalChecked,
    getRemainingBalance,
    getNextExpenses,
    getYearBalance,
    isFetching
};