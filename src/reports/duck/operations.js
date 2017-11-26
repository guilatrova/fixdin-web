import actions from './actions.js';
import { GetOperation } from './../../common/genericDuck/operations';
import handleError from '../../services/genericErrorHandler';

class FetchPendingTransactionsOperation extends GetOperation {
    constructor(kind) {
        super(`reports/pending-${kind.apiEndpoint}`, 
            actions.requestPendingTransactionsReport, 
            actions.receivePendingTransactionsReport);
        this.kind = kind;

        return this.dispatch();
    }

    onRequest(dispatch, requestAction) {
        dispatch(requestAction(this.kind));
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.kind));
        return data;
    }

    onFailed(dispatch, receiveAction, errors) {
        return dispatch(receiveAction('fail', handleError(errors), this.kind));
    }
}

class FetchLast13MonthsOperation extends GetOperation {
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

class FetchValuesByCategoryOperation extends GetOperation {
    constructor(kind) {
        super('reports/values-by-category/' + kind.apiEndpoint,
            actions.requestValuesByCategoryReport,
            actions.receiveValuesByCategoryReport);

        this.kind = kind;
        return this.dispatch();
    }

    onRequest(dispatch, requestAction) {
        dispatch(requestAction(this.kind));
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.kind));
        return data;
    }

    onFailed(dispatch, receiveAction, errors) {
        return dispatch(receiveAction('fail', handleError(errors), this.kind));
    }
}

const fetchLast13MonthsReport = 
    (real = false) => new FetchLast13MonthsOperation(real);

const fetchPendingTransactionsReport = 
    (kind) => new FetchPendingTransactionsOperation(kind);

const fetchValuesByCategoryReport = 
    (kind) => new FetchValuesByCategoryOperation(kind);

export default {
    fetchLast13MonthsReport,
    fetchPendingTransactionsReport,
    fetchValuesByCategoryReport
};