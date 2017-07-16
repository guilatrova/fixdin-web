import moment from 'moment';

import { EXPENSE } from './../kinds';
import createApi from '../../services/api';
import handleError from '../../services/genericErrorHandler';
import { formatDate, formatCurrency } from '../../services/formatter';
import getQueryParams from '../../services/query';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION';
export const COPY_TRANSACTION = 'COPY_TRANSACTION';
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
export const FINISH_EDIT_TRANSACTION = 'FINISH_EDIT_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

function formatDateAndValue(transaction) {
    return {
        ...transaction,
        due_date: moment(transaction.due_date, 'YYYY-MM-DD'),
        payment_date: transaction.payment_date ? moment(transaction.payment_date, 'YYYY-MM-DD') : undefined,
        value: transaction.value.replace('.', ',')
    }
}

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
            transactions: data.map(transaction => formatDateAndValue(transaction))
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
            transaction: formatDateAndValue(data)
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

export function saveTransaction({ id, due_date, description, category, value, details, importance, deadline, payment_date }, kind) {
    return dispatch => {
        dispatch(requestSaveTransaction());        
        
        due_date = formatDate(due_date);
        payment_date = formatDate(payment_date);
        value = formatCurrency(value);

        if (kind == EXPENSE && value > 0) {
            value = -value;
        }
        
        const data = {
            due_date,
            description,
            category,
            value,
            details,
            importance,
            deadline,
            payment_date
        }

        let apiPromise = (id) ? update(id, data, kind) : create(data, kind);
        
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