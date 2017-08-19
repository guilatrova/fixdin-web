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

export default {
    requestLast13MonthsReport,
    receiveLast13MonthsReport
}