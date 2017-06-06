import { SAVE_TRANSACTION_CATEGORY } from './actions';

const initialState = {
    isFetching: false,
    errors: {}
}

function saveTransactionCategory(state, action) {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false
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
                isFetching: true,
                errors: {}
            }
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_TRANSACTION_CATEGORY:
            return saveTransactionCategory(state, action);

        default:
            return state;
    }
}