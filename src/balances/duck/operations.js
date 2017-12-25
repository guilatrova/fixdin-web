import moment from 'moment';
import actions from './actions';
import { formatDate } from './../../services/formatter';
import handleError from '../../services/genericErrorHandler';
import { GetOperation } from '../../common/genericDuck/operations';
import getQueryParams from '../../services/query';

export class GetBalanceOperation extends GetOperation {
    constructor(storeKey, filters = {}) {
        super('balances/current', actions.requestBalance, actions.receiveBalance);
        this.storeKey = storeKey;
        this.filters = filters;
    }

    onRequest(dispatch, requestAction) {
        dispatch(requestAction(this.storeKey));
    }
    
    getSucceedData(raw) {
        return raw.balance;
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.storeKey));
        return data;
    }    

    onFailed(dispatch, receiveAction, errors) {
        return dispatch(receiveAction('fail', handleError(errors), this.storeKey));
    }    

    getApiPromise(api) {
        const queryParams = getQueryParams(this.filters);
        return api.get(this.endpoint + queryParams);
    }
}

const dispatchGetOperation = (storeKey, filters) => 
    new GetBalanceOperation(storeKey, filters).dispatch();

const fetchBalance = () => dispatchGetOperation('balance');
const fetchRealBalance = () => dispatchGetOperation('realBalance', {'payed': '1'});
const fetchExpectedBalance = () => {
    const lastDayOfMonth = moment().endOf('month');
    const until = formatDate(lastDayOfMonth);
    return dispatchGetOperation('expectedBalance', { until });
};

export default {
    fetchBalance,
    fetchRealBalance,
    fetchExpectedBalance
};