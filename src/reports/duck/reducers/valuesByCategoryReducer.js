import types from '../types';
import { EXPENSE, INCOME } from '../../../transactions/kinds';

const initialState = {
    expenses: {
        isFetching: false,
        data: [],
        errors: {}
    },
    incomes: {
        isFetching: false,
        data: [],
        errors: {}
    }
};

function innerKindReducer(innerState, action) {
    switch (action.result) {
        case 'success':
            return {
                ...innerState,
                isFetching: false,
                data: action.data,
                errors: {}
            };

        case 'fail':
            return {
                ...innerState,
                isFetching: false,
                errors: action.errors
            };


        default:
            return {
                ...innerState,
                isFetching: true
            };
    }
}

export default function reducer(state = initialState, action) {
    if (action.type != types.FETCH_VALUES_BY_CATEGORY)
        return state;

    switch (action.kind) {
        case INCOME:
            return {
                expenses: {
                    ...state.expenses
                },
                incomes: innerKindReducer(state.incomes, action)
            };

        case EXPENSE:
            return {
                expenses:  innerKindReducer(state.expenses, action),
                incomes: {
                    ...state.incomes
                }
            };

        default:
            return state;
    }
}