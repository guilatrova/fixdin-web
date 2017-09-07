import types from '../types';
import { EXPENSE } from '../../../transactions/kinds';

const initialState = {
    isFetching: false,
    expenses: {
        next: [],
        overdue: []
    },
    incomes: {
        next: [],
        overdue: []
    },
    errors: {}
};

export default function reducer(state = initialState, action) {
    if (action.type != types.FETCH_PENDING_TRANSACTIONS) {
        return state;
    }

    switch(action.result) {
        case 'success':
            const kind = (action.kind.id == EXPENSE.id) ? 'expenses' : 'incomes';

            return {
                ...state,
                isFetching: false,
                errors: {},
                [kind]: action.data
            }

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors: action.errors
            }

        default:
            return {
                ...state,
                isFetching: true
            }
    }
}