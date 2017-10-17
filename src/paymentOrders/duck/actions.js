import types from './types';

const checkDefaultIncomes = (balance) => {
    return {
        type: types.CHECK_DEFAULT_INCOMES,
        balance
    }
}

const changeUntilDate = (untilDate, pendingIncomes) => {
    return {
        type: types.CHANGE_UNTIL_DATE,
        untilDate,
        pendingIncomes
    }
}

export default {
    checkDefaultIncomes,
    changeUntilDate
};