import actions from './actions.js';
import { createGetOperation, GetOperation } from './../../common/genericDuck/operations';

class FetchPendingTransactionsOperation extends GetOperation {
    constructor(kind) {
        super(`reports/pending-${kind.apiEndpoint}`, 
            actions.requestPendingTransactionsReport, 
            actions.receivePendingTransactionsReport);
        this.kind = kind;

        return this.dispatch();
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.kind));
        return data;
    }
}

const fetchLast13MonthsReport = createGetOperation(
    'reports/last-13-months',
    actions.requestLast13MonthsReport,
    actions.receiveLast13MonthsReport
);

const fetchPendingTransactionsReport = 
    (kind) => new FetchPendingTransactionsOperation(kind);

export default {
    fetchLast13MonthsReport,
    fetchPendingTransactionsReport
};