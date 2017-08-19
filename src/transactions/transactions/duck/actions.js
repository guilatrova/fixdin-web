import types from './types';
import { formatTransactionReceived } from '../../../services/formatter';

//FETCH
function requestTransactions() {
    return {
        type: types.FETCH_TRANSACTIONS
    }
}

function receiveTransactions(result, data) {
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
function requestSaveTransaction() {
    return {
        type: types.SAVE_TRANSACTION
    }
}

function receiveSaveTransaction(result, data) {
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
function copyTransaction(id) {
    return {
        type: types.COPY_TRANSACTION,
        id
    }
}

//EDIT
function editTransaction(id) {
    return {
        type: types.EDIT_TRANSACTION,
        id
    }
}

function finishEditTransaction() {
    return {
        type: types.FINISH_EDIT_TRANSACTION
    }
}

//DELETE
function requestDeleteTransaction(id) {
    return {
        type: types.DELETE_TRANSACTION,
        id
    }
}

function receiveDeleteTransaction(id, result, errors) {
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

export default {
    requestTransactions,
    receiveTransactions,
    requestSaveTransaction,
    receiveSaveTransaction,
    requestDeleteTransaction,
    receiveDeleteTransaction,
    copyTransaction,
    editTransaction,
    finishEditTransaction
}