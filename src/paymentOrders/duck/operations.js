import moment from 'moment';
import actions from './actions';
import selectors from './selectors';
import { selectors as balanceSelectors } from './../../balances/duck';
import { GetOperation } from '../../common/duck/operations';
import getQueryParams from '../../services/query';
import formatters from '../formatters';
import { formatDate } from '../../utils/formatters';

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
const changePeriod = (period) => (dispatch, getState) => {
    dispatch(actions.changePeriod(period));

    const promise = new FetchNextExpenses(period).dispatch()(dispatch, getState);
    promise.then(() => dispatch(checkDefaultExpenses()));

    return promise;
};
const fetchNextExpenses = (from, until) => new FetchNextExpenses(from, until).dispatch();

export default {
    changeValueToSave,
    changePeriod,

    toggleExpense,
    checkDefaultExpenses,
    reset,
    fetchNextExpenses
};