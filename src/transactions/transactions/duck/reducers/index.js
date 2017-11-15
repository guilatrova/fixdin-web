import types from '../types';
import saveReducer from './saveReducer';
import filterReducer from './filterReducer';
import fetchReducer from './fetchReducer';
import deleteReducer from './deleteReducer';
import payReducer from './payReducer';

const initialState = {
    transactions: [],
    filters: {},
    visibleTransactions: undefined,
    editingTransaction: {},
    isFetching: false,
    errors: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case types.SAVE_TRANSACTION:
        case types.SAVE_ALL_PERIODIC_TRANSACTIONS:
        case types.SAVE_THIS_AND_NEXT_TRANSACTIONS:
            return saveReducer(state, action);

        case types.FILTER_TRANSACTIONS:
            return filterReducer(state, action);

        case types.FETCH_TRANSACTIONS:
            return fetchReducer(state, action);

        case types.DELETE_TRANSACTION:
        case types.DELETE_ALL_PERIODIC_TRANSACTIONS:
        case types.DELETE_THIS_AND_NEXT_TRANSACTIONS:
            return deleteReducer(state, action);

        case types.PAY_TRANSACTIONS:
            return payReducer(state, action);

        case types.CLEAR_FILTERS:
            return {
                ...state,
                filters: {},
                visibleTransactions: undefined
            };

        case types.SET_FILTERS:
            if (action.concatFilters) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        ...action.filters
                    }
                };
            }

            return {
                ...state,
                filters: action.filters
            };
            
        case types.COPY_TRANSACTION:
            const originalTransaction = state.transactions.find(transaction => transaction.id == action.id);
            const { id, periodic_transaction, ...copy } = originalTransaction;
        
            return {
                ...state,
                editingTransaction: copy
            };

        case types.EDIT_TRANSACTION:
            return {
                ...state,
                editingTransaction: state.transactions.find(transaction => transaction.id == action.id)
            }

        case types.FINISH_EDIT_TRANSACTION:
            return {
                ...state,
                editingTransaction: {},
                errors: {}
            }

        default:
            return state;
    }
}