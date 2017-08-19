import actions from './actions.js';
import createApi from './../../services/api';
import handleError from './../../services/genericErrorHandler';

const fetchBalance = () => (dispatch) => {
    dispatch(actions.requestBalance());

    const api = createApi();
    return api.get('balances/current')
        .then(response => response.data)
        .then((data) => {
            dispatch(actions.receiveBalance('success', data.balance));
            return data;
        })
        .catch(err => dispatch(actions.receiveBalance('fail', handleError(err))));
};

const fetchRealBalance = () => (dispatch) => {
    dispatch(actions.requestRealBalance());

    const api = createApi();
    return api.get('balances/current?payed=1')
        .then(response => response.data)
        .then((data) => {
            dispatch(actions.receiveRealBalance('success', data.balance));
            return data;
        })
        .catch(err => dispatch(actions.receiveRealBalance('fail', handleError(err))));
};

export default {
    fetchBalance,
    fetchRealBalance
};