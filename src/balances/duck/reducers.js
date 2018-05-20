import types from './types';
import specifications from '../specifications';

const initialState = {
    plain: [],
    detailed: [],
    detailedAccounts: [],
    periods: [],
    fetching: [],
    errors: {},
};

const fetchDetailedAccounts = (state, action) => {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                detailedAccounts: action.balances,
                errors: {},
                fetching: state.fetching.filter(x => x != action.type),
            };

        case 'fail':
            return {
                ...state,
                errors: action.errors,
                fetching: state.fetching.filter(x => x != action.type)
            };

        default:
            return {
                ...state,
                fetching: state.fetching.concat(action.type)
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
                    fetching: state.fetching.filter(x => x != action.type),
                    plain: [
                        ...plain.slice(0, index),
                        newPlainBalance,
                        ...plain.slice(index + 1)
                    ]
                };
            }

            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                plain: plain.concat(newPlainBalance)
            };
        }

        case 'fail':
            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                errors,
            };

        default:
            return {
                ...state,
                fetching: state.fetching.concat(action.type)
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
                    fetching: state.fetching.filter(x => x != action.type),
                    detailed: [
                        ...detailed.slice(0, index),
                        newDetailedBalance,
                        ...detailed.slice(index + 1)
                    ]
                };
            }
            
            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                detailed: detailed.concat(newDetailedBalance)
            };
        }

        case 'fail':
            return {
                ...state,
                fetching: state.fetching.filter(x => x != action.type),
                errors
            };

        default:
            return {
                ...state,
                fetching: state.fetching.concat(action.type)
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
                fetching: state.fetching.filter(x => x != action.type)
            };

        case 'fail':
            return {
                ...state,
                errors: action.errors,
                fetching: state.fetching.filter(x => x != action.type)
            };

        default:
            return {
                ...state,
                fetching: state.fetching.concat(action.type)
            };
    }
};

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