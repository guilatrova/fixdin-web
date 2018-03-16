import types from './types';

// Not being used for now. Maybe in future we can back this feature
const changeValueToSave = (toSave) => ({
    type: types.CHANGE_VALUE_TO_SAVE,
    toSave
});

const changePeriod = (period) => ({
    type: types.CHANGE_PERIOD,
    period
});

const toggleExpense = (expenseIds, expenses) => {
    if (!Array.isArray(expenseIds)) {
        expenseIds = [ expenseIds ];
    }

    return {
        type: types.TOGGLE_EXPENSE,
        expenseIds,
        expenses
    };
};

const checkDefaultExpenses = (balance, nextExpenses) => {
    return {
        type: types.CHECK_DEFAULT_EXPENSES,
        balance,
        nextExpenses
    };
};

const reset = (remainingBalance, nextExpenses) => {
    return {
        type: types.RESET,
        remainingBalance,
        nextExpenses
    };
};

const fetchNextExpenses = () => ({
    type: types.FETCH_NEXT_EXPENSES        
});

const receiveNextExpenses = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_NEXT_EXPENSES,
            result,
            nextExpenses: data
        };
    }

    return {
        type: types.FETCH_NEXT_EXPENSES,
        result,
        errors: data
    };
};

export default {
    changeValueToSave,
    changePeriod,
    toggleExpense,
    checkDefaultExpenses,
    reset,

    fetchNextExpenses,
    receiveNextExpenses
};