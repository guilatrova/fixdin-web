import updateTransactions from './updateTransactions';

export default function reducer(state, action) {
    switch(action.result) {
        
        case 'success': {
            const newState = {
                ...state,
                isFetching: false,
                visibleTransactions: action.transactions
            };
            return updateTransactions(newState, action.transactions);
        }

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
}