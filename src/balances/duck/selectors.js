import commonSelectors from '../../common/duck/selectors';
import specifications from '../specifications';

const getPlainBalance = (state, options = {}, notFound = 0) => {
    const foundBalance = state.balances.plain
        .find(balance => specifications.isSameBalance(balance, options));
    return foundBalance ? foundBalance.balance : notFound;
};

const getDetailedBalance = (state, options = {}, notFound = { expenses: 0, incomes: 0, total: 0 }) => {
    const foundBalance = state.balances.detailed
        .find(balance => specifications.isSameBalance(balance, options));
    return foundBalance || notFound;
};

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

const getPeriods = (state) => state.balances.periods;

const isFetching = (state, type) => commonSelectors.isFetching(state.accounts, type);

export default {
    getPeriods,
    getPlainBalance,
    getDetailedBalance,
    getDetailedAccounts,
    getTotalsDetailedAccounts,
    isFetching
};
