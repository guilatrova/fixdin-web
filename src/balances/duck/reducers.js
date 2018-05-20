import types from './types';
import specifications from '../specifications';

const initialState = {
    plain: [],
    detailed: [],
    detailedAccounts: [],
    periods: [],
    isFetching: false,
    errors: {},
};

const fetchDetailedAccounts = (state, action) => {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                detailedAccounts: action.balances,
                errors: {},
                isFetching: false
            };

        case 'fail':
            return {
                ...state,
                errors: action.errors,
                isFetching: false
            };

        default:
            return {
                ...state,
                isFetching: true
            };
    }
};

const fetchPlainBalance = (state, action) => {
    /* eslint-disable no-unused-vars */
    const { type, result, errors, balance, ...options } = action;
    
    switch (result) {
        case 'success': {
            const plain = state.plain;
            const updatedPlain = plain.find(balance => specifications.isSameBalance(balance, options));
            const newPlainBalance = { balance: action.balance, ...options };

            if (updatedPlain) {
                const index = plain.indexOf(updatedPlain);

                return {
                    ...state,
                    isFetching: false,
                    plain: [
                        ...plain.slice(0, index),
                        newPlainBalance,
                        ...plain.slice(index + 1)
                    ]
                };
            }

            return {
                ...state,
                isFetching: false,
                plain: plain.concat(newPlainBalance)
            };
        }

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors,
            };

        default:
            return {
                ...state,
                isFetching: true
            };
    }
};

const fetchDetailedBalance = (state, action) => {//TODO: refactor it
    const { type, result, errors, detailedBalance, ...options } = action;

    switch (result) {
        case 'success': {
            const detailed = state.detailed;
            const updateDetailed = detailed.find(balance => specifications.isSameBalance(balance, options));
            const newDetailedBalance = { ...detailedBalance, ...options };

            if (updateDetailed) {
                const index = detailed.indexOf(updateDetailed);

                return {
                    ...state,
                    isFetching: false,
                    detailed: [
                        ...detailed.slice(0, index),
                        newDetailedBalance,
                        ...detailed.slice(index + 1)
                    ]
                };
            }
            
            return {
                ...state,
                isFetching: false,
                detailed: detailed.concat(newDetailedBalance)
            };
        }

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors
            };

        default:
            return {
                ...state,
                isFetching: true
            };
    }
};

const fetchPeriods = (state, action) => {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                periods: action.periods,
                errors: {},
                isFetching: false
            };

        case 'fail':
            return {
                ...state,
                errors: action.errors,
                isFetching: false
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
        case types.FETCH_PLAIN_BALANCE:
            return fetchPlainBalance(state, action);

        case types.FETCH_DETAILED_BALANCE:
            return fetchDetailedBalance(state, action);

        case types.FETCH_ACCOUNTS_DETAILED_BALANCE:
            return fetchDetailedAccounts(state, action);

        case types.FETCH_PERIODS_BALANCE:
            return fetchPeriods(state, action);

        default:
            return state;
    }
}