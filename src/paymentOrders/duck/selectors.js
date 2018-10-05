import commonSelectors from '../../common/duck/selectors';
import { selectors as transactionsSelectors } from '../../transactions/transactions/duck';

const getPeriod = (state) => state.paymentOrders.period;
const getChecked = (state) => state.paymentOrders.checked;
const getSuggested = (state) => state.paymentOrders.suggested;
const getTotalChecked = (state) => state.paymentOrders.totalChecked;
const getRemainingBalance = (state) => state.paymentOrders.remainingBalance;
const getNextExpenses = (state) => state.paymentOrders.nextExpenses;
const getYearBalance = (state) => state.paymentOrders.yearBalance;
const isFetching = (state, type) => commonSelectors.isFetching(state.accounts, type);

const getCheckedByAccount = (state) => {
    const checkedIds = getChecked(state);
    const checkedTransactions = transactionsSelectors.getAllTransactions(state)
        .filter(t => checkedIds.includes(t.id));

    return checkedTransactions.reduce((prev, transaction) => {
        const index = transaction.account;
        if (prev[index]) {
            prev[index] += transaction.value;
        }
        else {
            prev[index] = transaction.value;
        }
        return prev;
    }, []);
};

export default {
    getPeriod,
    getChecked,
    getCheckedByAccount,
    getSuggested,
    getTotalChecked,
    getRemainingBalance,
    getNextExpenses,
    getYearBalance,
    isFetching
};
