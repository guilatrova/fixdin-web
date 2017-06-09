import moment from 'moment';

import { EXPENSE } from './../kinds';
import createApi from '../../services/api';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION';
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
export const FINISH_EDIT_TRANSACTION = 'FINISH_EDIT_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

function getCurrencyValue(value) {
    let unformattedAmount = value.replace(/[^0-9|,|-]+/g, "");
    unformattedAmount = unformattedAmount.replace(",", ".");
    return Number(unformattedAmount);
}

function formatDateAndValue(transaction) {
    return {
        ...transaction,
        due_date: moment(transaction.due_date, 'YYYY-MM-DD'),
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

export function fetchTransactions(kind) {
    return dispatch => {
        dispatch(requestTransactions());
        const api = createApi();

        return api.get(kind.apiEndpoint)
            .then(response => response.data)
            .then((data) => {
                dispatch(receiveTransactions('success', data));
            })
            .catch(({response}) => dispatch(receiveTransactions('fail', response.data)));
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

export function saveTransaction({ id, account, due_date, description, category, value, details, importance, deadline }, kind) {
    return dispatch => {
        dispatch(requestSaveTransaction());        
        
        due_date = due_date.format('YYYY-MM-DD');
        value = getCurrencyValue(value);

        if (kind == EXPENSE) {
            value = -value;
        }
        
        const data = {
            due_date,
            description,
            category: 1,
            value,
            details,
            account: 1,
            importance,
            deadline
        }

        let apiPromise = (id) ? update(id, data, kind) : create(data, kind);
        
        apiPromise
            .then(response => response.data)
            .then(data => dispatch(receiveSaveTransaction('success', data)))
            .catch(({response}) => dispatch(receiveSaveTransaction('fail', response.data)))            
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
        api.delete(kind.apiEndpoint + id)
            .then(() => dispatch(receiveDeleteTransaction(id, 'success')))
            .catch(({response}) => dispatch(receiveDeleteTransaction(id, 'fail', response.data)))
    }
}