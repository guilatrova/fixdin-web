import actions from './actions';
import { GetOperation } from './../../common/duck/operations';
import handleError from '../../services/genericErrorHandler';

class FetchPendingTransactionsOperation extends GetOperation {
    constructor(kind) {
        super(actions.requestPendingTransactionsReport, 
            actions.receivePendingTransactionsReport);
        this.kind = kind;
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

    getEndpoint = () => `reports/pending-${this.kind.apiEndpoint}`;
}

class FetchLastMonthsOperation extends GetOperation {
    constructor(months) {
        super(actions.requestLastMonthsReport, actions.receiveLastMonthsReport);
        this.months = months;
    }

    getEndpoint = () => `reports/last-months/?months=${this.months}`;
}

class FetchValuesByCategoryOperation extends GetOperation {
    constructor(kind) {
        super(actions.requestValuesByCategoryReport,
            actions.receiveValuesByCategoryReport);

        this.kind = kind;
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

    getEndpoint = () => `reports/values-by-category/${this.kind.apiEndpoint}`;
}

const fetchLastMonthsReport = 
    (months) => new FetchLastMonthsOperation(months).dispatch();

const fetchPendingTransactionsReport = 
    (kind) => new FetchPendingTransactionsOperation(kind).dispatch();

const fetchValuesByCategoryReport = 
    (kind) => new FetchValuesByCategoryOperation(kind).dispatch();

export default {
    fetchLastMonthsReport,
    fetchPendingTransactionsReport,
    fetchValuesByCategoryReport
};