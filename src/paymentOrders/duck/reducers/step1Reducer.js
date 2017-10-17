import types from '../types';
import moment from 'moment';

const today = () => moment({ hour: 0});

const initialState = {
    checked: [],
    visibleIncomes: [],
    untilDate: today(),
    total: 0,
    toSave: 0,
    totalChecked: 0
}

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
    }
}

export default function reducer(state = initialState, action) {    
    switch (action.type) {

        case types.CHECK_DEFAULT_INCOMES:            
            const filtered = state.visibleIncomes.filter(income => income.due_date.isSameOrAfter(today()));
            const checked = filtered.map(income => income.id);
            const totalChecked = filtered.map(income => income.value).reduce((acc, cur) => acc + cur, 0);

            return {
                ...state,
                checked,
                totalChecked,
                total: action.balance + totalChecked
            }

        case types.CHANGE_UNTIL_DATE:
            return changeUntilDate(state, action);

        default:
            return state;
    }
}