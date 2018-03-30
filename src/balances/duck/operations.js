import moment from 'moment';
import actions from './actions';
import { formatDate } from './../../utils/formatters';
import handleError from '../../services/genericErrorHandler';
import { GetOperation } from '../../common/duck/operations';
import getQueryParams from '../../services/query';

export class FetchBalanceOperation extends GetOperation {
    constructor(storeKey, filters = {}) {
        super(actions.requestBalance, actions.receiveBalance);
        this.storeKey = storeKey;
        this.filters = filters;
    }

    onRequest(dispatch, requestAction) {
        dispatch(requestAction(this.storeKey));
    }    

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.storeKey));
        return data;
    }    

    onFailed(dispatch, receiveAction, errors) {
        return dispatch(receiveAction('fail', handleError(errors), this.storeKey));
    }
    
    getSucceedData = (raw) => raw.balance;

    getEndpoint = () => `balances/current/${getQueryParams(this.filters)}`;
}

export class FetchPendingIncomesBalance extends GetOperation {
    constructor() {
        super(actions.requestPendingIncomesBalance, actions.receivePendingIncomesBalance);
    }

    getSucceedData = raw => raw.balance;

    getEndpoint = () => "balances/pending-incomes/";
}

export class FetchPendingExpensesBalance extends GetOperation {
    constructor() {
        super(actions.requestPendingExpensesBalance, actions.receivePendingExpensesBalance);
    }

    getSucceedData = raw => raw.balance;

    getEndpoint = () => "balances/pending-expenses/";
}

export class FetchDetailedAccountsBalance extends GetOperation {
    constructor() {
        super(actions.requestDetailedAccountsBalance, actions.receiveDetailedAccountsBalance);
    }
    
    getEndpoint = () => "balances/accounts/effective-incomes-expenses/";
}

const dispatchGetOperation = (storeKey, filters) => 
    new FetchBalanceOperation(storeKey, filters).dispatch();

const fetchBalance = () => dispatchGetOperation('balance');
const fetchRealBalance = () => dispatchGetOperation('realBalance', {'payed': '1'});
const fetchExpectedBalance = () => {
    const lastDayOfMonth = moment().endOf('month');
    const until = formatDate(lastDayOfMonth);
    return dispatchGetOperation('expectedBalance', { until });
};
const fetchPendingIncomesBalance = () => new FetchPendingIncomesBalance().dispatch();
const fetchPendingExpensesBalance = () => new FetchPendingExpensesBalance().dispatch();
const fetchDetailedAccountsBalance = () => new FetchDetailedAccountsBalance().dispatch();

export default {
    fetchBalance,
    fetchRealBalance,
    fetchExpectedBalance,
    fetchPendingIncomesBalance,
    fetchPendingExpensesBalance,
    fetchDetailedAccountsBalance
};