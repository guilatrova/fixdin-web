import actions from './actions';
import { GetOperation } from '../../common/duck/operations';
import getQueryParams from '../../services/query';

export class FetchPendingIncomesBalance extends GetOperation {
    constructor() {
        super(actions.requestPendingIncomesBalance, actions.receivePendingIncomesBalance);
    }

    getSucceedData = raw => raw.balance;

    getEndpoint = () => "balances/plain/?pending=1&output=incomes";
}

export class FetchPendingExpensesBalance extends GetOperation {
    constructor() {
        super(actions.requestPendingExpensesBalance, actions.receivePendingExpensesBalance);
    }

    getSucceedData = raw => raw.balance;

    getEndpoint = () => "balances/plain/?pending=1&output=expenses";
}

export class FetchDetailedAccountsBalance extends GetOperation {
    constructor() {
        super(actions.requestDetailedAccountsBalance, actions.receiveDetailedAccountsBalance);
    }
    
    getEndpoint = () => "balances/accounts/detailed/";
}

export class FetchDetailedAccumulatedBalance extends GetOperation {
    constructor(from, until) {
        super(actions.requestDetailedAccumulatedBalance, actions.receiveDetailedAccumulatedBalance);
        this.from = from;
        this.until = until;
    }

    getQueryParamsObject = () => ({ from: this.from, until: this.until });
    
    getEndpoint = () => "balances/detailed/" + getQueryParams(this.getQueryParamsObject());
}

export class FetchPlainBalance extends GetOperation {
    constructor(options) {
        super(actions.fetchPlainBalance, actions.receivePlainBalance);
        this.options = options;
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.options));
        return data;
    }

    getSucceedData = raw => raw.balance;

    getEndpoint() { 
        const queryParams = getQueryParams(this.options);
        return `balances/plain/${queryParams}`;
    }
}

const fetchPlainBalance = (options = {}) => new FetchPlainBalance(options).dispatch();
const fetchPendingIncomesBalance = () => new FetchPendingIncomesBalance().dispatch();
const fetchPendingExpensesBalance = () => new FetchPendingExpensesBalance().dispatch();
const fetchDetailedAccountsBalance = () => new FetchDetailedAccountsBalance().dispatch();
const fetchDetailedAccumulatedBalance = (from, until) => new FetchDetailedAccumulatedBalance(from, until).dispatch();

export default {
    fetchPlainBalance,
    fetchPendingIncomesBalance,
    fetchPendingExpensesBalance,
    fetchDetailedAccountsBalance,
    fetchDetailedAccumulatedBalance
};