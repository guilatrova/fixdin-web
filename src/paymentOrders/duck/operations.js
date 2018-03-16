import actions from './actions';
import selectors from './selectors';
import { selectors as balanceSelectors } from './../../balances/duck';
import { GetOperation } from '../../common/duck/operations';
import getQueryParams from '../../services/query';
import formatters from '../formatters';

class FetchNextExpenses extends GetOperation {
    constructor(from, until) {
        super(actions.fetchNextExpenses, actions.receiveNextExpenses);
        this.from = from;
        this.until = until;
    }

    getEndpoint = () => `payment-orders/` + getQueryParams({ from: this.from, until: this.until });
}

const toggleExpense = (expenseIds) => (dispatch, getState) => {
    const state = getState();
    const expenses = selectors.getNextExpenses(state);
    const transactions = formatters.reduceNextExpensesToTransactionsArray(expenses);
    dispatch(actions.toggleExpense(expenseIds, transactions));
};

const checkDefaultExpenses = () => (dispatch, getState) => {
    const state = getState();
    const balance = balanceSelectors.getRealBalance(state);
    const expenses = selectors.getNextExpenses(state);
    const transactions = formatters.reduceNextExpensesToTransactionsArray(expenses);
    dispatch(actions.checkDefaultExpenses(balance, transactions));
};

const reset = () => (dispatch, getState) => {
    const state = getState();
    const balance = balanceSelectors.getRealBalance(state);
    const expenses = selectors.getNextExpenses(state);
    dispatch(actions.reset(balance, expenses));
};

const changeValueToSave = actions.changeValueToSave;
const changePeriod = actions.changePeriod;
const fetchNextExpenses = (from, until) => new FetchNextExpenses(from, until).dispatch();

export default {
    changeValueToSave,
    changePeriod,

    toggleExpense,
    checkDefaultExpenses,
    reset,
    fetchNextExpenses
};