import moment from 'moment';
import actions from './actions';
import selectors from './selectors';
import getQueryParams from '../../services/query';
import { selectors as balanceSelectors } from './../../balances/duck';
import { selectors as transactionsSelectors } from '../../transactions/transactions/duck';
import { GetOperation } from '../../common/duck/operations';
import formatters from '../formatters';

class FetchNextExpenses extends GetOperation {
    constructor(from, until) {
        super(actions.fetchNextExpenses, actions.receiveNextExpenses);
        this.from = from;
        this.until = until;
    }

    getEndpoint = () => `payment-orders/` + getQueryParams({ from: this.from, until: this.until });
}

const toggleIncome = actions.toggleIncome;
const changeValueToSave = actions.changeValueToSave;

const checkDefaultIncomes = () => (dispatch, getState) => {
    const balance = balanceSelectors.getRealBalance(getState());
    dispatch(actions.checkDefaultIncomes(balance));
};

const changeUntilDate = (untilDate) => (dispatch, getState) => {
    const pendingIncomes = transactionsSelectors.getPendingIncomesUntil(getState(), untilDate);
    dispatch(actions.changeUntilDate(untilDate, pendingIncomes));
};

const resetStep1 = () => (dispatch, getState) => {
    const balance = balanceSelectors.getRealBalance(getState());
    const pendingIncomes = transactionsSelectors.getPendingIncomesUntil(getState(), moment({ hour: 0 }));
    dispatch(actions.resetStep1(balance, pendingIncomes));
};

//Step2
const toggleExpense = (expenseIds) => (dispatch, getState) => {
    const state = getState();    
    const expenses = selectors.step2.getNextExpenses(state);
    const transactions = formatters.reduceNextExpensesToTransactionsArray(expenses);
    dispatch(actions.toggleExpense(expenseIds, transactions));
};

const checkDefaultExpenses = () => (dispatch, getState) => {
    const state = getState();
    const balance = selectors.step1.getTotal(state);
    const expenses = selectors.step2.getNextExpenses(state);
    const transactions = formatters.reduceNextExpensesToTransactionsArray(expenses);
    dispatch(actions.checkDefaultExpenses(balance, transactions));
};

const resetStep2 = () => (dispatch, getState) => {
    const state = getState();
    const balance = selectors.step1.getTotal(state);
    const expenses = selectors.step2.getNextExpenses(state);
    dispatch(actions.resetStep2(balance, expenses));
};

const fetchNextExpenses = (from, until) => new FetchNextExpenses(from, until).dispatch();

export default {
    toggleIncome,
    changeValueToSave,
    checkDefaultIncomes,
    changeUntilDate,
    resetStep1,

    toggleExpense,
    checkDefaultExpenses,
    resetStep2,
    fetchNextExpenses
};