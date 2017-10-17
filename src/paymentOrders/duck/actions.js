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

const changeValueToSave = (toSave) => {
    return {
        type: types.CHANGE_VALUE_TO_SAVE,
        toSave
    }
}

const reset = (balance, pendingIncomes) => {
    return {
        type: types.RESET,
        balance,
        pendingIncomes
    }
}

export default {
    checkDefaultIncomes,
    changeUntilDate,
    changeValueToSave,
    toggleIncome,
    reset
};