import types from './types';

const requestBalance = () => {
    return {
        type: types.FETCH_BALANCE
    }
};

const receiveBalance = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_BALANCE,
            result,
            balance: data
        }
    }

    return {
        type: types.FETCH_BALANCE,
        result,
        errors: data
    }
}

const requestRealBalance = () => {
    return {
        type: types.FETCH_REAL_BALANCE
    }
};

const receiveRealBalance = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_REAL_BALANCE,
            result,
            balance: data
        }
    }

    return {
        type: types.FETCH_REAL_BALANCE,
        result,
        errors: data
    }
}

export default {
    requestBalance,
    receiveBalance,
    requestRealBalance,
    receiveRealBalance
}