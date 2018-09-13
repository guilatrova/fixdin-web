import types from './types';

const initialState = {
    editingAccount: {},
    errors: {},
    fetching: [],
    accounts: [],
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
                    fetching: state.fetching.filter(x => x != action.type),
                    [stateKey]: [
                        ...items.slice(0, index),
                        action[itemKey],
                        ...items.slice(index + 1)
                    ]
                };
            }

            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                [stateKey]: state[stateKey].concat(action[itemKey])
            };
        }

        case 'fail':
            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                errors: action.errors
            };

        default:
            return {
                ...state,
                fetching: state.fetching.concat(action.type),
                errors: {}
            };
    }
}

function fetchReducer(state, key, action) {
    switch (action.result) {
        case 'success': {
            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                [key]: action[key]
            };
        }

        case 'fail':
            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                errors: action.errors
            };

        default:
            return {
                ...state,
                fetching: state.fetching.concat(action.type),
            };
    }
}

function deleteTransferReducer(state, action) {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                transfers: state.transfers.filter(transfer => transfer.id != action.id)
            };

        case 'fail':
            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                errors: action.errors
            };

        default:
            return {
                ...state,
                fetching: state.fetching.concat(action.type),
            };
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.SAVE_ACCOUNT:
            return saveReducer(state, 'account', action);

        case types.ARCHIVE_ACCOUNT:
            return saveReducer(state, 'account', action);

        case types.SAVE_TRANSFER:
            return saveReducer(state, 'transfer', action);

        case types.FETCH_ACCOUNTS:
            return fetchReducer(state, 'accounts', action);

        case types.FETCH_TRANSFERS:
            return fetchReducer(state, 'transfers', action);

        case types.DELETE_TRANSFER:
            return deleteTransferReducer(state, action);

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
