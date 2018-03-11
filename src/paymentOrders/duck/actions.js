import types from './types';

const checkDefaultIncomes = (balance) => {
    return {
        type: types.CHECK_DEFAULT_INCOMES,
        balance
    };
};

const changeUntilDate = (untilDate, pendingIncomes) => {
    return {
        type: types.CHANGE_UNTIL_DATE,
        untilDate,
        pendingIncomes
    };
};

const toggleIncome = (incomeIds) => {
    if (!Array.isArray(incomeIds)) {
        incomeIds = [ incomeIds ];
    }

    return {
        type: types.TOGGLE_INCOME,
        incomeIds
    };
};

const changeValueToSave = (toSave) => {
    return {
        type: types.CHANGE_VALUE_TO_SAVE,
        toSave
    };
};

const resetStep1 = (balance, pendingIncomes) => {
    return {
        type: types.RESET_STEP1,
        balance,
        pendingIncomes
    };
};

//Step2
const toggleExpense = (expenseIds) => {
    if (!Array.isArray(expenseIds)) {
        expenseIds = [ expenseIds ];
    }

    return {
        type: types.TOGGLE_EXPENSE,
        expenseIds
    };
};

const checkDefaultExpenses = (balance, nextExpenses) => {
    return {
        type: types.CHECK_DEFAULT_EXPENSES,
        balance,
        nextExpenses
    };
};

const resetStep2 = (remainingBalance, nextExpenses) => {
    return {
        type: types.RESET_STEP2,
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
    checkDefaultIncomes,
    changeUntilDate,
    changeValueToSave,
    toggleIncome,
    resetStep1,

    toggleExpense,
    checkDefaultExpenses,
    resetStep2,

    fetchNextExpenses,
    receiveNextExpenses
};