import types from '../types';
import comparators from '../../../transactions/transactions/comparators';

const initialState = {
    remainingBalance: undefined,
    checked: [],
    totalChecked: 0,
    visibleExpenses: []
}

const toggleExpense = (state, action) => {
    const checked = state.checked.slice();
    const newChecked = [...checked];

    for (let i = 0; i < action.expenseIds.length; i++) {
        const expenseId = action.expenseIds[i];
        const currentIndex = checked.indexOf(expenseId);

        if (currentIndex === -1) {
            newChecked.push(expenseId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    }

    const diffTotalChecked = state.visibleExpenses
        .filter(expense => newChecked.includes(expense.id))
        .map(expense => expense.value)
        .reduce((acc, cur) => acc + cur, 0) - state.totalChecked;

    const totalChecked = diffTotalChecked + state.totalChecked;
    const remainingBalance = state.remainingBalance - diffTotalChecked;
    
    return {
        ...state,
        checked: newChecked,
        totalChecked,
        remainingBalance
    }
};

const checkDefaultExpenses = (state, action) => {
    const visibleExpenses = action.visibleExpenses;    
    const sorted = visibleExpenses.sort(comparators.expensesToBePaidCompare);
    const checked = [];
    let remainingBalance = action.balance;
    let totalChecked = 0;

    for (let i in sorted) {
        let expense = sorted[i];
        const diffBalance = remainingBalance + expense.value; //It's plus because expense is already negative

        if (diffBalance > 0) {
            remainingBalance = diffBalance;
            checked.push(expense.id);
            totalChecked += -expense.value;
        }
    }

    return {
        ...state,
        checked,
        totalChecked,
        remainingBalance
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case types.TOGGLE_EXPENSE:
            return toggleExpense(state, action);

        case types.CHECK_DEFAULT_EXPENSES:
            return checkDefaultExpenses(state, action);

        case types.RESET_STEP2:
            return {
                ...state,
                remainingBalance: action.remainingBalance,
                visibleExpenses: action.visibleExpenses,
                checked: [],
                totalChecked: 0
            }

        default:
            return state;
    }
}