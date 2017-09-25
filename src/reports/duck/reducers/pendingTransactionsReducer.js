import types from '../types';
import { EXPENSE } from '../../../transactions/kinds';

const initialState = {
    expenses: {
        next: [],
        overdue: [],
        isFetching: false
    },
    incomes: {
        next: [],
        overdue: [],
        isFetching: false
    },
    errors: {}
};

export default function reducer(state = initialState, action) {
    if (action.type != types.FETCH_PENDING_TRANSACTIONS) {
        return state;
    }

    const kind = (action.kind.id == EXPENSE.id) ? 'expenses' : 'incomes';
    switch(action.result) {
        case 'success':
            return {
                ...state,                
                errors: {},
                [kind]: { 
                    ...action.data,
                    isFetching: false
                }
            }

        case 'fail':
            return {
                ...state,
                errors: action.errors,
                [kind]: {
                    ...state[kind],
                    isFetching: false
                }
            }

        default:
            return {
                ...state,
                [kind]: {
                    ...state[kind],
                    isFetching: true
                }
            }
    }
}