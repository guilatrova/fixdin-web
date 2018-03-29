import moment from 'moment';

const getDate = (action) => moment(action.transaction.due_date, 'YYYY-MM-DD');

export default function reducer(state, action) {
    switch (action.result) {
        case 'success':            
            return {
                ...state,
                isFetching: false,
                oldestPendingExpense: getDate(action)
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
}