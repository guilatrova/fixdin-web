import types from './types';

const changePeriod = (period) => ({
    type: types.CHANGE_PERIOD,
    period
});

const toggleExpense = (expenseIds, expenses) => {
    if (!Array.isArray(expenseIds)) {
        expenseIds = [expenseIds];
    }

    return {
        type: types.TOGGLE_EXPENSE,
        expenseIds,
        expenses
    };
};

const checkDefaultExpenses = (balance, nextExpenses) => ({
    type: types.CHECK_DEFAULT_EXPENSES,
    balance,
    nextExpenses
});

const reset = (remainingBalance, nextExpenses) => ({
    type: types.RESET,
    remainingBalance,
    nextExpenses
});

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

const setYearBalance = (balance) => ({
    type: types.SET_YEAR_BALANCE,
    balance
});

const resetSelectionToSuggestion = (transactionIds, expenses) => ({
    type: types.RESET_SELECTION_SUGGESTION,
    ids: transactionIds,
    expenses
});

export default {
    changePeriod,
    toggleExpense,
    checkDefaultExpenses,
    reset,
    setYearBalance,
    resetSelectionToSuggestion,

    fetchNextExpenses,
    receiveNextExpenses
};
