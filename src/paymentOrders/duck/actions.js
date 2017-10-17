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

const toggleIncome = (incomeIds) => {
    if (!Array.isArray(incomeIds)) {
        incomeIds = [ incomeIds ];
    }

    return {
        type: types.TOGGLE_INCOME,
        incomeIds
    }
}

export default {
    checkDefaultIncomes,
    changeUntilDate,
    toggleIncome
};