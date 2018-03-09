import moment from 'moment';
import actions from './actions';
import selectors from './selectors';
import getQueryParams from '../../services/query';
import { selectors as balanceSelectors } from './../../balances/duck';
import { selectors as transactionsSelectors } from '../../transactions/transactions/duck';
import { GetOperation } from '../../common/duck/operations';

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
const toggleExpense = actions.toggleExpense;

const checkDefaultExpenses = () => (dispatch, getState) => {
    const untilDate = selectors.step1.getUntilDate(getState());
    const balance = selectors.step1.getTotal(getState());
    const expenses = transactionsSelectors.getPendingExpensesUntil(getState(), untilDate);
    dispatch(actions.checkDefaultExpenses(balance, expenses));
};

const resetStep2 = () => (dispatch, getState) => {
    const untilDate = selectors.step1.getUntilDate(getState());
    const balance = selectors.step1.getTotal(getState());
    const expenses = transactionsSelectors.getPendingExpensesUntil(getState(), untilDate);
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