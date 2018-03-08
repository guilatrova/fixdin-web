import moment from 'moment';
import actions from './actions';
import { formatDate } from './../../utils/formatters';
import handleError from '../../services/genericErrorHandler';
import { GetOperation } from '../../common/duck/operations';
import getQueryParams from '../../services/query';

export class GetBalanceOperation extends GetOperation {
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

    getEndpoint = () => `balances/current${getQueryParams(this.filters)}`;
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