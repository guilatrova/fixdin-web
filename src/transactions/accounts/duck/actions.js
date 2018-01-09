import types from './types';

//FETCH
function fetchAccounts() {
    return {
        type: types.FETCH_ACCOUNTS
    };
}

function receiveAccounts(result, data) {
    if (result === 'success') {
        return {
            type: types.FETCH_ACCOUNTS,
            result,
            accounts: data
        };
    }

    return {
        type: types.FETCH_ACCOUNTS,
        result,
        errors: data
    };
}

//SAVE
function requestSaveAccount() {
    return {
        type: types.SAVE_ACCOUNT
    };
}

function receiveSaveAccount(result, data) {
    if (result === 'success') {
        return {
            type: types.SAVE_ACCOUNT,            
            result,
            account: data
        };
    }

    return {
        type: types.SAVE_ACCOUNT,
        result,
        errors: data
    };
}

//TRANSFER
function requestTransfer(value, from, to) {
    return {
        type: types.TRANSFER_BETWEEN_ACCOUNTS,
        value,
        from,
        to
    };
}

function receiveTransfer(result, data) {
    if (result === 'success') {
        return {
            type: types.TRANSFER_BETWEEN_ACCOUNTS,
            result,
            accounts: data
        };
    }

    return {
        type: types.TRANSFER_BETWEEN_ACCOUNTS,
        result,
        errors: data
    };
}

//EDIT
function editAccount(id) {
    return {
        type: types.EDIT_ACCOUNT,
        id
    };
}

function finishEditAccount() {
    return {
        type: types.FINISH_EDIT_ACCOUNT
    };
}

export default {
    fetchAccounts,
    receiveAccounts,

    requestSaveAccount,
    receiveSaveAccount,

    requestTransfer,
    receiveTransfer,

    editAccount,
    finishEditAccount
};