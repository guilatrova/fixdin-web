import types from './types';

const initialState = {
    isFetching: false,
    errors: {},
    accounts: [],
    editingAccount: {},
    transfers: []
};

function saveReducer(state, itemKey, action) {
    switch (action.result) {
        case 'success': {
            const stateKey = itemKey + "s"; // Pluralize
            const items = state[stateKey];
            const updatedItem = items.find(item => item.id == action[itemKey].id);

            if (updatedItem) {
                const index = items.indexOf(updatedItem);

                return {
                    ...state,
                    isFetching: false,
                    [stateKey]: [
                        ...items.slice(0, index),
                        action[itemKey],
                        ...items.slice(index + 1)
                    ]
                };
            }

            return {
                ...state,
                isFetching: false,
                [stateKey]: state[stateKey].concat(action[itemKey])
            };
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
                isFetching: true,
                errors: {}
            };
    }
}

function fetchReducer(state, key, action) {
    switch(action.result) {
        case 'success': {
            return {
                ...state,
                isFetching: false,
                [key]: action.accounts
            };
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

export default function reducer(state = initialState, action) {    
    switch (action.type) {
        case types.SAVE_ACCOUNT:
            return saveReducer(state, 'account', action);
        
        case types.SAVE_TRANSFER:
            return saveReducer(state, 'transfers', action);

        case types.FETCH_ACCOUNTS:
            return fetchReducer(state, 'accounts', action);
            
        case types.FETCH_TRANSFERS:
            return fetchReducer(state, 'transfers', action);

        case types.EDIT_ACCOUNT:
            return {
                ...state,
                editingAccount: state.accounts.find(acc => acc.id === action.id)
            };

        case types.FINISH_EDIT_ACCOUNT:
            return {
                ...state,
                editingAccount: {}
            };

        default:
            return state;
    }
}