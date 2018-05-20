import moment from 'moment';
import { GetOperation } from '../../common/duck/operations';

import actions from './actions';
import selectors from './selectors';
import formatters from '../formatters';
import getQueryParams from '../../services/query';
import { formatDate } from '../../utils/formatters';

import balanceOptions from '../../balances/options';
import { selectors as balanceSelectors, operations as balanceOperations } from '../../balances/duck';
import { selectors as transactionSelectors, operations as transactionOperations } from '../../transactions/transactions/duck';

class FetchNextExpenses extends GetOperation {
    constructor(from) {
        super(actions.fetchNextExpenses, actions.receiveNextExpenses);
        this.from = from;
    }

    getQueryParamsObject() {
        let { from } = this;
        let until;
        
        if (!from) {
            from = moment().startOf('month');
        }

        until = formatDate(from.clone().add(11, 'months')); //11 + 1 = 12
        from = formatDate(from);
                
        return { from, until };
    }

    getEndpoint = () => `payment-orders/` + getQueryParams(this.getQueryParamsObject());
}

const toggleExpense = (expenseIds) => (dispatch, getState) => {
    const state = getState();
    const expenses = selectors.getNextExpenses(state);
    const transactions = formatters.reduceNextExpensesToTransactionsArray(expenses);
    dispatch(actions.toggleExpense(expenseIds, transactions));
};

const checkDefaultExpenses = () => (dispatch, getState) => {
    const state = getState();
    const balance = balanceSelectors.getPlainBalance(state, { based: 'real' });
    const expenses = selectors.getNextExpenses(state);
    const transactions = formatters.reduceNextExpensesToTransactionsArray(expenses);
    dispatch(actions.checkDefaultExpenses(balance, transactions));
};

const reset = () => (dispatch, getState) => {
    const state = getState();
    const balance = balanceSelectors.getPlainBalance(state, { based: 'real' });
    const expenses = selectors.getNextExpenses(state);
    dispatch(actions.reset(balance, expenses));
};

const changePeriod = (period) => (dispatch, getState) => {
    dispatch(actions.changePeriod(period));

    const promise = new FetchNextExpenses(period).dispatch()(dispatch, getState);
    promise.then(() => dispatch(checkDefaultExpenses()));

    return promise;
};

const setYearBalance = actions.setYearBalance;

const fetchNextExpenses = () => (dispatch, getState) => {
    const from = transactionSelectors.getOldestPendingExpenseDate(getState());
    return new FetchNextExpenses(from).dispatch()(dispatch, getState);
};

const initializeData = () => (dispatch) => {
    return dispatch(transactionOperations.fetchOldestExpense()).then((transaction) => { //transaction in case of success, action in case o failure
        const startDate = transaction.result == 'fail' ? moment() : moment(transaction.due_date);
        const endDate = startDate.clone().add(11, 'months');

        dispatch(changePeriod(startDate));
        dispatch(balanceOperations.fetchPeriodsBalance(startDate, endDate));
        dispatch(balanceOperations.fetchDetailedBalance(balanceOptions().range(startDate, endDate).build())).then(balance => {
            dispatch(setYearBalance(balance));
        });

        const p1 = dispatch(balanceOperations.fetchPlainBalance(balanceOptions().real().build()));
        const p2 = dispatch(fetchNextExpenses());
        Promise.all([p1, p2]).then(() => {
            dispatch(checkDefaultExpenses());
        });
    });
};

export default {
    changePeriod,
    setYearBalance,

    toggleExpense,
    checkDefaultExpenses,
    reset,
    fetchNextExpenses,

    initializeData
};