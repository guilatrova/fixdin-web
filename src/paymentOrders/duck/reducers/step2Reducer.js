import types from '../types';
import comparators from '../../../transactions/transactions/comparators';
import toggleTransaction from './toggleTransaction';

const initialState = {
    remainingBalance: undefined,
    checked: [],
    totalChecked: 0,

    nextExpenses: [],
    isFetching: false,
    errors: {}
};

const fetchNextExpensesReducer = (state, action) => {
    switch(action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false,
                nextExpenses: action.nextExpenses
            };

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors: action.errors
            };

        default:
            return {
                ...state,
                isFetching: true
            };
    }
};

const toggleExpense = (state, action) => {
    const { newChecked, diffTotalChecked, totalChecked } = 
        toggleTransaction(state.checked, action.expenseIds, action.expenses, state.totalChecked);
    const remainingBalance = state.remainingBalance + diffTotalChecked; //It's plus because expense is already negative
    
    return {
        ...state,
        checked: newChecked,
        totalChecked,
        remainingBalance
    };
};

const checkDefaultExpenses = (state, action) => {
    const nextExpenses = action.nextExpenses;    
    const sorted = nextExpenses.sort(comparators.expensesToBePaidCompare);
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
    };
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case types.TOGGLE_EXPENSE:
            return toggleExpense(state, action);

        case types.CHECK_DEFAULT_EXPENSES:
            return checkDefaultExpenses(state, action);

        case types.FETCH_NEXT_EXPENSES:
            return fetchNextExpensesReducer(state, action);

        case types.RESET_STEP2:
            return {
                ...state,
                remainingBalance: action.remainingBalance,
                nextExpenses: action.nextExpenses,
                checked: [],
                totalChecked: 0
            };

        default:
            return state;
    }
}