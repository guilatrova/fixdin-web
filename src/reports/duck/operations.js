import actions from './actions.js';
import { createGetOperation } from './../../common/generic_duck/operations';

const fetchLast13MonthsReport = createGetOperation(
    'reports/last-13-months',
    actions.requestLast13MonthsReport,
    actions.receiveLast13MonthsReport
);

export default {
    fetchLast13MonthsReport
};