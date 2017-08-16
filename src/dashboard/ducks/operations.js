import actions from './actions.js';
import createApi from './../../services/api';
import handleError from './../../services/genericErrorHandler';
import getQueryParams from './../../services/query';

const fetchBalance = (filters = {}) => (dispatch) => {
    dispatch(actions.requestBalance);

    const api = createApi();
    api.get('balances/current' + getQueryParams(filters))
        .then(response => response.data)
        .then((data) => {
            dispatch(actions.receiveBalance('success', data.balance));
            return data;
        })
        .catch(err => dispatch(actions.receiveBalance('fail', handleError(err))));
};

export default {
    fetchBalance
};