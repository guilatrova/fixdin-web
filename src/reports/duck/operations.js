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

class FetchLast13MonthsReport extends GetOperation {
    constructor(real = false) {
        super('reports/last-13-months/',
            actions.requestLast13MonthsReport,
            actions.receiveLast13MonthsReport);

        this.real = real;

        return this.dispatch();
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.real));
        return data;
    }

    getApiPromise(api) {
        const filter = this.real ? '?payed=1' : '';
        return api.get(this.endpoint + filter);
    }
}

const fetchLast13MonthsReport = 
    (real = false) => new FetchLast13MonthsReport(real);

const fetchPendingTransactionsReport = 
    (kind) => new FetchPendingTransactionsOperation(kind);

export default {
    fetchLast13MonthsReport,
    fetchPendingTransactionsReport
};