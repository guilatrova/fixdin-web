import updateTransactions from './updateTransactions';

export default function reducer(state, action) {
    switch (action.result) {
        case 'success':
            return updateTransactions(state, action.transactions);
            
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