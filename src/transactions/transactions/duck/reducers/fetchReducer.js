export default function reducer(state, action) {
    switch (action.result) {

        case 'success':

            return {
                ...state,                
                isFetching: false,
                errors: {},
                transactions: state.transactions
                    .filter(old => !action.transactions.some(newT => newT.id == old.id))
                    .concat(action.transactions)
            }
        
        case 'fail':
            return {
                ...state,
                errors: action.errors,
                isFetching: false
            }    

        default:
            return {
                ...state,
                isFetching: true,
                errors: {}
            }
    }
}