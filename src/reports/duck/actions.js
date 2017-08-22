import types from './types';

const requestLast13MonthsReport = () => {
    return {
        type: types.FETCH_LAST_13_MONTHS
    }
};

const receiveLast13MonthsReport = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_LAST_13_MONTHS,
            result,
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

export default {
    requestLast13MonthsReport,
    receiveLast13MonthsReport,
    requestPendingTransactionsReport,
    receivePendingTransactionsReport
}