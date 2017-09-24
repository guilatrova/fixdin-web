import moment from 'moment';
import actions from './actions.js';
import { formatDate } from './../../services/formatter';
import { GetOperation } from '../../common/genericDuck/operations';
import getQueryParams from '../../services/query';

class GetBalanceOperation extends GetOperation {
    constructor(storeKey, filters = {}) {
        super('balances/current', actions.requestBalance, actions.receiveBalance);
        this.storeKey = storeKey;
        this.filters = filters;

        return this.dispatch();
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
        console.log(queryParams, this.filters);
        return api.get(this.endpoint + queryParams);
    }
}

const fetchBalance = () => new GetBalanceOperation('balance');
const fetchRealBalance = () => new GetBalanceOperation('realBalance', {'payed': '1'});
const fetchExpectedBalance = () => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const until = formatDate(moment(lastDayOfMonth));
    return new GetBalanceOperation('expectedBalance', { until });
}

export default {
    fetchBalance,
    fetchRealBalance,
    fetchExpectedBalance
};