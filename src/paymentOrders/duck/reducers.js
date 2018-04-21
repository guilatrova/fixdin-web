import moment from 'moment';
import types from './types';
import comparators from '../../transactions/transactions/comparators';

const initialState = {
    remainingBalance: undefined,
    yearBalance: undefined,
    checked: [],
    totalChecked: 0,

    period: moment().startOf('month'),
    nextExpenses: [],
    isFetching: false,
    errors: {}
};

const toggleTransaction = (initialTotalChecked, initialChecked, toggleCheck, transactions) => {
    const newChecked = [...initialChecked];

    for (let id of toggleCheck) {
        const currentIndex = initialChecked.indexOf(id);

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    }

    let sumCheckedTransactions = transactions
        .filter(transaction => newChecked.includes(transaction.id))
        .map(transaction => transaction.value)
        .reduce((acc, cur) => acc + cur, 0);

    if (sumCheckedTransactions < 0) {
        sumCheckedTransactions = -sumCheckedTransactions;
    }

    const diffTotalChecked = sumCheckedTransactions - initialTotalChecked;

    const totalChecked = diffTotalChecked + initialTotalChecked;
    
    return {
        newChecked,
        diffTotalChecked,
        totalChecked
    };
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
        toggleTransaction(state.totalChecked, state.checked, action.expenseIds, action.expenses);
    const remainingBalance = state.remainingBalance - diffTotalChecked;
    
    return {
        ...state,
        checked: newChecked,
        totalChecked,
        remainingBalance
    };
};

const checkDefaultExpenses = (state, action) => {
    const today = moment().endOf('day');
    const checked = [];
    const currentPendingExpenses = action.nextExpenses
        .filter(expense => !expense.payment_date && expense.due_date <= today)
        .sort(comparators.expensesToBePaidCompare);

    let remainingBalance = action.balance;
    let totalChecked = 0;

    for (let expense of currentPendingExpenses) {
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

        case types.CHANGE_PERIOD:
            return {
                ...state,
                period: action.period
            };

        case types.SET_YEAR_BALANCE:
            return {
                ...state,
                yearBalance: action.balance
            };

        case types.RESET:
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