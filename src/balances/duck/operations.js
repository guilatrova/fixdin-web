import actions from './actions';
import { GetOperation } from '../../common/duck/operations';
import getQueryParams from '../../services/query';
import { formatDate } from '../../utils/formatters';

export class FetchBalanceWithOptionsOperation extends GetOperation {
    constructor(requestAction, receiveAction, options, balanceFormat) {
        super(requestAction, receiveAction);
        this.options = options;
        this.balanceFormat = balanceFormat;
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.options));
        return data;
    }

    getEndpoint() { 
        const queryParams = getQueryParams(this.options);
        return `balances/${this.balanceFormat}/${queryParams}`;
    }
}

export class FetchPlainBalance extends FetchBalanceWithOptionsOperation {
    constructor(options) {
        super(actions.fetchPlainBalance, actions.receivePlainBalance, options, "plain");
    }
    
    getSucceedData = raw => raw.balance;
}

export class FetchDetailedBalance extends FetchBalanceWithOptionsOperation {
    constructor(options) {
        super(actions.fetchDetailedBalance, actions.receiveDetailedBalance, options, "detailed");
    }
}

export class FetchDetailedAccountsBalance extends GetOperation {
    constructor() {
        super(actions.requestDetailedAccountsBalance, actions.receiveDetailedAccountsBalance);
    }
    
    getEndpoint = () => "balances/accounts/detailed/";
}

export class FetchPeriodsBalance extends GetOperation {
    constructor(from, until) {
        super(actions.fetchPeriodsBalance, actions.receivePeriodsBalance, { from, until });
        this.from = from;
        this.until = until;
    }

    getOptions = () => ({ from: formatDate(this.from), until: formatDate(this.until) });

    getEndpoint = () => `balances/periods/${getQueryParams(this.getOptions())}`;

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.getOptions()));
        return data;
    }
}

const fetchPlainBalance = (options) => new FetchPlainBalance(options).dispatch();
const fetchDetailedBalance = (options) => new FetchDetailedBalance(options).dispatch();
const fetchDetailedAccountsBalance = () => new FetchDetailedAccountsBalance().dispatch();
const fetchPeriodsBalance = (from, until) => new FetchPeriodsBalance(from, until).dispatch();

export default {
    fetchPlainBalance,
    fetchDetailedBalance,
    fetchDetailedAccountsBalance,
    fetchPeriodsBalance
};