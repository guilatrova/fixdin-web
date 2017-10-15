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
            return {
                ...state,
                untilDate: action.untilDate
            }

        default:
            return state;
    }
}