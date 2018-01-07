import types from './types';

const initialState = {
    isFetching: false,
    errors: {},
    accounts: [],
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
            const { accounts } = state;
            return {
                ...state,
                isFetching: false,
                accounts: [
                    accounts.filter(item => !action.accounts.map(acc => acc.id).includes(item.id)),
                    ...action.accounts
                ]
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

        default:
            return state;
    }
}