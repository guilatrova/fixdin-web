import actions from './actions';
import { GetOperation } from './../../common/duck/operations';
import handleError from '../../services/genericErrorHandler';
import getQueryParams from '../../services/query';

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
    constructor(months, start) {
        super(actions.requestLastMonthsReport, actions.receiveLastMonthsReport);
        this.months = months;
        this.start = start;
    }
    
    getQueryParamsObject = () => ({ months: this.months, start: this.start });

    getEndpoint = () => `reports/last-months/` + getQueryParams(this.getQueryParamsObject());
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
    (months, start=null) => new FetchLastMonthsOperation(months, start).dispatch();

const fetchPendingTransactionsReport = 
    (kind) => new FetchPendingTransactionsOperation(kind).dispatch();

const fetchValuesByCategoryReport = 
    (kind) => new FetchValuesByCategoryOperation(kind).dispatch();

export default {
    fetchLastMonthsReport,
    fetchPendingTransactionsReport,
    fetchValuesByCategoryReport
};