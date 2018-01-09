import types from './types';

const initialState = {
    isFetching: false,
    errors: {},
    accounts: [],
    editingAccount: {}
};

function saveReducer(state, action) {
    switch (action.result) {
        case 'success': {
            const { accounts } = state;
            const updatedAccount = accounts.find(item => item.id == action.account.id);

            if (updatedAccount) {
                const index = accounts.indexOf(updatedAccount);

                return {
                    ...state,
                    isFetching: false,
                    accounts: [
                        ...accounts.slice(0, index),
                        action.account,
                        ...accounts.slice(index + 1)
                    ]
                };
            }

            return {
                ...state,
                isFetching: false,
                accounts: state.accounts.concat(action.account)
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

function fetchReducer(state, action) {
    switch(action.result) {
        case 'success': {
            return {
                ...state,
                isFetching: false,
                accounts: action.accounts
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
            return saveReducer(state, action);

        case types.FETCH_ACCOUNTS:
        case types.TRANSFER_BETWEEN_ACCOUNTS:
            return fetchReducer(state, action);

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