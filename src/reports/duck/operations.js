import actions from './actions';
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

class FetchLastMonthsOperation extends GetOperation {
    constructor(months) {
        super('reports/last-months/',
            actions.requestLastMonthsReport,
            actions.receiveLastMonthsReport);

        this.months = months;
    }

    getApiPromise = (api) => api.get(this.endpoint + `?months=${this.months}`);
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

const fetchLastMonthsReport = 
    (months) => new FetchLastMonthsOperation(months).dispatch();

const fetchPendingTransactionsReport = 
    (kind) => new FetchPendingTransactionsOperation(kind);

const fetchValuesByCategoryReport = 
    (kind) => new FetchValuesByCategoryOperation(kind);

export default {
    fetchLastMonthsReport,
    fetchPendingTransactionsReport,
    fetchValuesByCategoryReport
};