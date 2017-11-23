import types from './types';

const requestLast13MonthsReport = (real) => {
    return {
        type: types.FETCH_LAST_13_MONTHS,
        real
    }
};

const receiveLast13MonthsReport = (result, data, real) => {
    if (result === 'success') {
        return {
            type: types.FETCH_LAST_13_MONTHS,
            result,
            real,
            data
        }
    }

    return {
        type: types.FETCH_LAST_13_MONTHS,
        result,
        errors: data
    }
};

const requestPendingTransactionsReport = (kind) => {
    return {
        type: types.FETCH_PENDING_TRANSACTIONS,
        kind
    }
};

const receivePendingTransactionsReport = (result, data, kind) => {
    if (result === 'success') {
        return {
            type: types.FETCH_PENDING_TRANSACTIONS,
            result,
            kind,
            data
        }
    }

    return {
        type: types.FETCH_PENDING_TRANSACTIONS,
        result,
        kind,
        errors: data
    }
};

const requestValuesByCategoryReport = (kind) => {
    return {
        type: types.FETCH_VALUES_BY_CATEGORY,
        kind
    }
};

const receiveValuesByCategoryReport = (result, data, kind) => {
    if (result === 'success') {
        return {
            type: types.FETCH_VALUES_BY_CATEGORY,
            kind,
            result,
            data
        }
    }

    return {
        type: types.FETCH_VALUES_BY_CATEGORY,
        kind,
        result,
        errors: data
    }
};

export default {
    requestLast13MonthsReport,
    receiveLast13MonthsReport,
    
    requestPendingTransactionsReport,
    receivePendingTransactionsReport,

    requestValuesByCategoryReport,
    receiveValuesByCategoryReport
}