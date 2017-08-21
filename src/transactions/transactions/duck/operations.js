import actions from './actions';
import createApi from '../../../services/api';
import handleError from '../../../services/genericErrorHandler';
import { formatTransactionToSend } from '../../../services/formatter';
import getQueryParams from '../../../services/query';
import createOperation, { Operation } from './../../../common/generic_duck/operations';

function update(id, data, kind) {
    const api = createApi();
    return api.put(kind.apiEndpoint + id, data);
}

function create(data, kind) {
    const api = createApi();
    return api.post(kind.apiEndpoint, data);
}

const copyTransaction = actions.copyTransaction;
const editTransaction = actions.editTransaction;
const finishEditTransaction = actions.finishEditTransaction;

const fetchTransactions = (kind, filters = undefined) => (dispatch) => {    
    dispatch(actions.requestTransactions());
    const api = createApi();
    
    const queryParams = getQueryParams(filters);

    return api.get(kind.apiEndpoint + queryParams)
        .then(response => response.data)
        .then((data) => {
            dispatch(actions.receiveTransactions('success', data));
            return data;
        })
        .catch(err => dispatch(actions.receiveTransactions('fail', handleError(err))));    
};

const saveTransaction = (transaction, kind) => (dispatch) => {    
    dispatch(actions.requestSaveTransaction());
            
    const data = formatTransactionToSend(transaction, kind);
    
    let apiPromise = (transaction.id) ? update(transaction.id, data, kind) : create(data, kind);
    
    return apiPromise
        .then(response => response.data)
        .then(data => dispatch(actions.receiveSaveTransaction('success', data)))
        .catch(err => dispatch(actions.receiveSaveTransaction('fail', handleError(err))))    
};

const deleteTransaction = (id, kind) => (dispatch) => {
    dispatch(actions.requestDeleteTransaction(id));

    const api = createApi();
    return api.delete(kind.apiEndpoint + id)
        .then(() => dispatch(actions.receiveDeleteTransaction(id, 'success')))
        .catch(err => dispatch(actions.receiveDeleteTransaction(id, 'fail', handleError(err))))    
};

export default {
    copyTransaction,
    editTransaction,
    finishEditTransaction,
    fetchTransactions,
    saveTransaction,
    deleteTransaction
};