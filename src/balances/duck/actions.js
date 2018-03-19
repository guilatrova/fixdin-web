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

const requestPendingIncomesBalance = () => {
    return {
        type: types.FETCH_PENDING_INCOMES_BALANCES        
    }
}

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
}

export default {
    requestBalance,
    receiveBalance,

    requestPendingIncomesBalance,
    receivePendingIncomesBalance
};