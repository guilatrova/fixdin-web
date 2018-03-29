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

export default {
    requestBalance,
    receiveBalance,

    requestPendingIncomesBalance,
    receivePendingIncomesBalance,

    requestPendingExpensesBalance,
    receivePendingExpensesBalance
};