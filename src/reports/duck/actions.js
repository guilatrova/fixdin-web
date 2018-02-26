import types from './types';

const requestLastMonthsReport = () => {
    return {
        type: types.FETCH_LAST_MONTHS
    };
};

const receiveLastMonthsReport = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_LAST_MONTHS,
            result,
            data
        };
    }

    return {
        type: types.FETCH_LAST_MONTHS,
        result,
        errors: data
    };
};

const requestPendingTransactionsReport = (kind) => {
    return {
        type: types.FETCH_PENDING_TRANSACTIONS,
        kind
    };
};

const receivePendingTransactionsReport = (result, data, kind) => {
    if (result === 'success') {
        return {
            type: types.FETCH_PENDING_TRANSACTIONS,
            result,
            kind,
            data
        };
    }

    return {
        type: types.FETCH_PENDING_TRANSACTIONS,
        result,
        kind,
        errors: data
    };
};

const requestValuesByCategoryReport = (kind) => {
    return {
        type: types.FETCH_VALUES_BY_CATEGORY,
        kind
    };
};

const receiveValuesByCategoryReport = (result, data, kind) => {
    if (result === 'success') {
        return {
            type: types.FETCH_VALUES_BY_CATEGORY,
            kind,
            result,
            data
        };
    }

    return {
        type: types.FETCH_VALUES_BY_CATEGORY,
        kind,
        result,
        errors: data
    };
};

export default {
    requestLastMonthsReport,
    receiveLastMonthsReport,
    
    requestPendingTransactionsReport,
    receivePendingTransactionsReport,

    requestValuesByCategoryReport,
    receiveValuesByCategoryReport
};