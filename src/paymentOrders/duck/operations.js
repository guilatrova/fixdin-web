import moment from 'moment';
import actions from './actions';
import { selectors as balanceSelectors } from './../../balances/duck';
import { selectors as transactionsSelectors } from '../../transactions/transactions/duck';

const toggleIncome = actions.toggleIncome;
const changeValueToSave = actions.changeValueToSave;

const checkDefaultIncomes = () => (dispatch, getState) => {
    const balance = balanceSelectors.getRealBalance(getState());
    dispatch(actions.checkDefaultIncomes(balance));
}

const changeUntilDate = (untilDate) => (dispatch, getState) => {
    const pendingIncomes = transactionsSelectors.getPendingIncomesUntil(getState(), untilDate);
    dispatch(actions.changeUntilDate(untilDate, pendingIncomes));
}

const reset = () => (dispatch, getState) => {
    const balance = balanceSelectors.getRealBalance(getState());
    const pendingIncomes = transactionsSelectors.getPendingIncomesUntil(getState(), moment({ hour: 0 }));
    dispatch(actions.reset(balance, pendingIncomes));
}

export default {
    toggleIncome,
    changeValueToSave,
    checkDefaultIncomes,
    changeUntilDate,
    reset
}