import types from '../types';
import moment from 'moment';
import toggleTransaction from './toggleTransaction';

const today = () => moment({ hour: 0});

const initialState = {
    checked: [],
    visibleIncomes: [],
    untilDate: today(),
    total: 0,
    toSave: 0,
    totalChecked: 0
};

const checkDefaultIncomes = (state, action) => {
    const filtered = state.visibleIncomes.filter(income => income.due_date.isSameOrAfter(today()));
    const checked = filtered.map(income => income.id);
    const totalChecked = filtered.map(income => income.value).reduce((acc, cur) => acc + cur, 0);

    return {
        ...state,
        checked,
        totalChecked,
        total: action.balance + totalChecked
    };
};

const changeUntilDate = (state, action) => {
    const visibleIncomes = action.pendingIncomes;
    const removeCheck = state.checked.filter(incomeId => !visibleIncomes.map(income => income.id).includes(incomeId));
    const decrease = state.visibleIncomes.filter(removedIncome => 
        removeCheck.includes(removedIncome.id))
        .map(removedIncome => removedIncome.value)
        .reduce((acc, cur) => acc + cur, 0);

    const checked = state.checked.filter(incomeId => !removeCheck.includes(incomeId));
    const total = state.total - decrease;
    const totalChecked = state.totalChecked - decrease;

    return {
        ...state,
        checked,
        visibleIncomes,
        untilDate: action.untilDate,
        total,
        totalChecked
    };
};

const toggleIncome = (state, action) => {
    const { newChecked, diffTotalChecked, totalChecked } = 
        toggleTransaction(state.totalChecked, state.checked, action.incomeIds, state.visibleIncomes);
    const total = diffTotalChecked + state.total;
    
    return {
        ...state,
        checked: newChecked,
        total,
        totalChecked
    };
};

const changeValueToSave = (state, action) => {
    const diff = state.toSave - action.toSave;
    const total = state.total + diff;

    return {
        ...state,
        toSave: action.toSave,
        total
    };
};

const reset = (state, action) => {
    return {
        ...state,
        checked: [],
        visibleIncomes: action.pendingIncomes,
        untilDate: today(),
        total: action.balance,
        totalChecked: 0,
        toSave: 0,
    };
};

export default function reducer(state = initialState, action) {    
    switch (action.type) {

        case types.CHECK_DEFAULT_INCOMES:
            return checkDefaultIncomes(state, action);

        case types.CHANGE_UNTIL_DATE:
            return changeUntilDate(state, action);

        case types.TOGGLE_INCOME:
            return toggleIncome(state, action);

        case types.CHANGE_VALUE_TO_SAVE:
            return changeValueToSave(state, action);

        case types.RESET_STEP1:
            return reset(state, action);

        default:
            return state;
    }
}