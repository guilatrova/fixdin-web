import commonSelectors from '../../common/duck/selectors';
import { selectors as balanceSelectors } from '../../balances/duck';
import formatters from '../formatters';

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
    const expenses = formatters.reduceNextExpensesToTransactionsArray(getNextExpenses(state));
    const checkedTransactions = expenses.filter(t => checkedIds.includes(t.id));

    return checkedTransactions.reduce((prev, transaction) => {
        const index = transaction.account;
        if (prev[index]) {
            prev[index] += transaction.value;
        }
        else {
            prev[index] = transaction.value;
        }
        return prev;
    }, {});
};

const getExpectedAccountsBalance = (state) => {
    const balances = balanceSelectors.getDetailedAccounts(state).slice();
    const minusBalances = getCheckedByAccount(state);

    for (let accountId of Object.keys(minusBalances)) {
        const balance = balances.find(balance => balance.account == accountId);
        const index = balances.indexOf(balance);
        const newBalance = {
            ...balance,
            expenses: balance.expenses + minusBalances[accountId],
            total: balance.total + minusBalances[accountId],
            highlight: true
        };

        // We replace on array because otherwise it will change the object from state.
        // Slice has no effect on objects in this case.
        balances[index] = newBalance;
    }

    return balances;
};

export default {
    getPeriod,
    getChecked,
    getCheckedByAccount,
    getExpectedAccountsBalance,
    getSuggested,
    getTotalChecked,
    getRemainingBalance,
    getNextExpenses,
    getYearBalance,
    isFetching
};
