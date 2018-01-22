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
function saveTransfer(value, from, to) {
    return {
        type: types.SAVE_TRANSFER,
        value,
        from,
        to
    };
}

function receiveSaveTransfer(result, data) {
    if (result === 'success') {
        return {
            type: types.SAVE_TRANSFER,
            result,
            transfer: data
        };
    }

    return {
        type: types.SAVE_TRANSFER,
        result,
        errors: data
    };
}

function fetchTransfers() {
    return {
        type: types.FETCH_TRANSFERS        
    };
}

function receiveTransfers(result, data) {
    if (result === 'success') {
        return {
            type: types.FETCH_TRANSFERS,
            result,
            transfers: data
        };
    }

    return {
        type: types.FETCH_TRANSFERS,
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

    fetchTransfers,
    receiveTransfers,

    saveTransfer,
    receiveSaveTransfer,

    editAccount,
    finishEditAccount
};