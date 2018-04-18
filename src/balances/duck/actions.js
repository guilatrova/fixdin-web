import types from './types';

const requestBalance = (key) => {
    return {
        type: types.FETCH_BALANCE,
        key
    };
};

const receiveBalance = (result, data, key) => {
    if (result === 'success') {
        return {
            type: types.FETCH_BALANCE,
            key,
            result,
            balance: data,
        };
    }

    return {
        type: types.FETCH_BALANCE,
        key,
        result,
        errors: data
    };
};

const requestPendingIncomesBalance = () => ({
    type: types.FETCH_PENDING_INCOMES_BALANCES
});

const receivePendingIncomesBalance = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_PENDING_INCOMES_BALANCES,
            result,
            balance: data,
        };
    }

    return {
        type: types.FETCH_PENDING_INCOMES_BALANCES,
        result,
        errors: data
    };
};

const requestPendingExpensesBalance = () => ({
    type: types.FETCH_PENDING_EXPENSES_BALANCES
});

const receivePendingExpensesBalance = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_PENDING_EXPENSES_BALANCES,
            result,
            balance: data,
        };
    }

    return {
        type: types.FETCH_PENDING_EXPENSES_BALANCES,
        result,
        errors: data
    };
};

const requestDetailedAccountsBalance = () => ({
    type: types.FETCH_DETAILED_ACCOUNTS_BALANCE
});

const receiveDetailedAccountsBalance = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_DETAILED_ACCOUNTS_BALANCE,
            result,
            balances: data,
        };
    }

    return {
        type: types.FETCH_DETAILED_ACCOUNTS_BALANCE,
        result,
        errors: data
    };
};

const requestDetailedAccumulatedBalance = () => ({
    type: types.FETCH_DETAILED_ACCUMULATED_BALANCE
});

const receiveDetailedAccumulatedBalance = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_DETAILED_ACCUMULATED_BALANCE,
            result,
            balance: data,
        };
    }

    return {
        type: types.FETCH_DETAILED_ACCUMULATED_BALANCE,
        result,
        errors: data
    };
};

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

export default {
    requestBalance,
    receiveBalance,

    requestPendingIncomesBalance,
    receivePendingIncomesBalance,

    requestPendingExpensesBalance,
    receivePendingExpensesBalance,

    requestDetailedAccountsBalance,
    receiveDetailedAccountsBalance,

    requestDetailedAccumulatedBalance,
    receiveDetailedAccumulatedBalance,

    fetchPlainBalance,
    receivePlainBalance
};