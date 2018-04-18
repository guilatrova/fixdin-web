import types from './types';

const fetchPlainBalance = () => ({
    type: types.FETCH_PLAIN_BALANCE,    
});

const receivePlainBalance = (result, data, options) => {
    if (result === "success") {
        return {
            type: types.FETCH_PLAIN_BALANCE,
            result,
            balance: data,
            ...options
        };
    }

    return {
        type: types.FETCH_PLAIN_BALANCE,
        result,
        errors: data,
        ...options
    };
};

const fetchDetailedBalance = () => ({
    type: types.FETCH_DETAILED_BALANCE
});

const receiveDetailedBalance = (result, data, options) => {
    if (result === 'success') {
        return {
            type: types.FETCH_DETAILED_BALANCE,
            result,
            detailedBalance: data,
            ...options
        };
    }

    return {
        type: types.FETCH_DETAILED_BALANCE,
        result,
        errors: data,
        ...options
    };
};

const requestDetailedAccountsBalance = () => ({
    type: types.FETCH_ACCOUNTS_DETAILED_BALANCE
});

const receiveDetailedAccountsBalance = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_ACCOUNTS_DETAILED_BALANCE,
            result,
            balances: data,
        };
    }

    return {
        type: types.FETCH_ACCOUNTS_DETAILED_BALANCE,
        result,
        errors: data
    };
};

export default {
    fetchPlainBalance,
    receivePlainBalance,

    fetchDetailedBalance,
    receiveDetailedBalance,

    requestDetailedAccountsBalance,
    receiveDetailedAccountsBalance,
};