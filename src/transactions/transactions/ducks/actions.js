import * as types from './types';
import { formatTransactionReceived } from '../../../services/formatter';

//FETCH
export function requestTransactions() {
    return {
        type: types.FETCH_TRANSACTIONS
    }
}

export function receiveTransactions(result, data) {
    if (result === 'success') {
        return {
            type: types.FETCH_TRANSACTIONS,
            result,
            transactions: data.map(transaction => formatTransactionReceived(transaction))
        }
    }

    return {
        type: types.FETCH_TRANSACTIONS,
        result,
        errors: data
    }
}

//SAVE
export function requestSaveTransaction() {
    return {
        type: types.SAVE_TRANSACTION
    }
}

export function receiveSaveTransaction(result, data) {
    if (result === 'success') {
        return {
            type: types.SAVE_TRANSACTION,
            result,
            transaction: formatTransactionReceived(data)
        }
    }

    return {
        type: types.SAVE_TRANSACTION,
        result,
        errors: data
    }
}

//COPY
export function copyTransaction(id) {
    return {
        type: types.COPY_TRANSACTION,
        id
    }
}

//EDIT
export function editTransaction(id) {
    return {
        type: types.EDIT_TRANSACTION,
        id
    }
}

export function finishEditTransaction() {
    return {
        type: types.FINISH_EDIT_TRANSACTION
    }
}

//DELETE
export function requestDeleteTransaction(id) {
    return {
        type: types.DELETE_TRANSACTION,
        id
    }
}

export function receiveDeleteTransaction(id, result, errors) {
    if (result == 'success') {
        return {
            type: types.DELETE_TRANSACTION,
            id,
            result
        }
    }

    return {
        type: types.DELETE_TRANSACTION,
        result,
        errors
    }
}