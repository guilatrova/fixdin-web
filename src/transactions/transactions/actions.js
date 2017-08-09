import moment from 'moment';

import { EXPENSE } from './../kinds';
import createApi from '../../services/api';
import handleError from '../../services/genericErrorHandler';
import { formatTransactionReceived, formatTransactionToSend } from '../../services/formatter';
import getQueryParams from '../../services/query';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION';
export const COPY_TRANSACTION = 'COPY_TRANSACTION';
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
export const FINISH_EDIT_TRANSACTION = 'FINISH_EDIT_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

//FETCH
function requestTransactions() {
    return {
        type: FETCH_TRANSACTIONS
    }
}

function receiveTransactions(result, data) {
    if (result === 'success') {
        return {
            type: FETCH_TRANSACTIONS,
            result,
            transactions: data.map(transaction => formatTransactionReceived(transaction))
        }
    }

    return {
        type: FETCH_TRANSACTIONS,
        result,
        errors: data
    }
}

export function fetchTransactions(kind, filters = undefined) {
    return dispatch => {
        dispatch(requestTransactions());
        const api = createApi();
        
        const queryParams = getQueryParams(filters);

        return api.get(kind.apiEndpoint + queryParams)
            .then(response => response.data)
            .then((data) => {
                dispatch(receiveTransactions('success', data));
                return data;
            })
            .catch(err => dispatch(receiveTransactions('fail', handleError(err))));
    }
}

//SAVE
function requestSaveTransaction() {
    return {
        type: SAVE_TRANSACTION
    }
}

function receiveSaveTransaction(result, data) {
    if (result === 'success') {
        return {
            type: SAVE_TRANSACTION,
            result,
            transaction: formatTransactionReceived(data)
        }
    }

    return {
        type: SAVE_TRANSACTION,
        result,
        errors: data
    }
}

function update(id, data, kind) {
    const api = createApi();
    return api.put(kind.apiEndpoint + id, data);
}

function create(data, kind) {
    const api = createApi();
    return api.post(kind.apiEndpoint, data);
}

export function saveTransaction(transaction, kind) {
    return dispatch => {
        dispatch(requestSaveTransaction());        
                
        const data = formatTransactionToSend(transaction);
        
        let apiPromise = (transaction.id) ? update(transaction.id, data, kind) : create(data, kind);
        
        return apiPromise
            .then(response => response.data)
            .then(data => dispatch(receiveSaveTransaction('success', data)))
            .catch(err => dispatch(receiveSaveTransaction('fail', handleError(err))))
    }
}

//COPY
export function copyTransaction(id) {
    return {
        type: COPY_TRANSACTION,
        id
    }
}

//EDIT
export function editTransaction(id) {
    return {
        type: EDIT_TRANSACTION,
        id
    }
}

export function finishEditTransaction() {
    return {
        type: FINISH_EDIT_TRANSACTION
    }
}

//DELETE
function requestDeleteTransaction(id) {
    return {
        type: DELETE_TRANSACTION,
        id
    }
}

function receiveDeleteTransaction(id, result, errors) {
    if (result == 'success') {
        return {
            type: DELETE_TRANSACTION,
            id,
            result
        }
    }

    return {
        type: DELETE_TRANSACTION,
        result,
        errors
    }
}

export function deleteTransaction(id, kind) {
    return dispatch => {
        dispatch(requestDeleteTransaction(id));

        const api = createApi();
        return api.delete(kind.apiEndpoint + id)
            .then(() => dispatch(receiveDeleteTransaction(id, 'success')))
            .catch(err => dispatch(receiveDeleteTransaction(id, 'fail', handleError(err))))
    }
}