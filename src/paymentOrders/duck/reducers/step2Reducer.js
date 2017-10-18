import types from '../types';

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

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case types.TOGGLE_EXPENSE:
            return toggleExpense(state, action);

        default:
            return state;
    }
}