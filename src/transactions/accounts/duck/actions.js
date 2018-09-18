import types from './types';
import formatters from '../formatters';

//FETCH
const fetchAccounts = () => ({
    type: types.FETCH_ACCOUNTS
});

const receiveAccounts = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_ACCOUNTS,
            result,
            accounts: data.map(account => formatters.formatAccountReceived(account))
        };
    }

    return {
        type: types.FETCH_ACCOUNTS,
        result,
        errors: data
    };
};

//SAVE
const requestSaveAccount = () => ({
    type: types.SAVE_ACCOUNT
});

const receiveSaveAccount = (result, data) => {
    if (result === 'success') {
        return {
            type: types.SAVE_ACCOUNT,
            result,
            account: formatters.formatAccountReceived(data)
        };
    }

    return {
        type: types.SAVE_ACCOUNT,
        result,
        errors: data
    };
};

//ARCHIVE
const requestArchiveAccount = () => ({
    type: types.ARCHIVE_ACCOUNT
});

const receiveArchiveAccount = (result, data) => {
    if (result === 'success') {
        return {
            type: types.ARCHIVE_ACCOUNT,
            result,
            account: data
        };
    }

    return {
        type: types.ARCHIVE_ACCOUNT,
        result,
        errors: data
    };
};

//DELETE
const deleteAccount = (id) => ({
    type: types.DELETE_ACCOUNT,
    id
});

const receiveDeleteAccount = (id, result, errors) => {
    if (result === 'success') {
        return {
            type: types.DELETE_ACCOUNT,
            id,
            result
        };
    }

    return {
        type: types.DELETE_ACCOUNT,
        result,
        errors
    };
};


//TRANSFER
const saveTransfer = (value, from, to) => ({
    type: types.SAVE_TRANSFER,
    value,
    from,
    to
});

const receiveSaveTransfer = (result, data) => {
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
};

const fetchTransfers = () => ({
    type: types.FETCH_TRANSFERS
});

const receiveTransfers = (result, data) => {
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
};

const deleteTransfer = (id) => ({
    type: types.DELETE_TRANSFER,
    id
});

const receiveDeleteTransfer = (id, result, errors) => {
    if (result === 'success') {
        return {
            type: types.DELETE_TRANSFER,
            id,
            result
        };
    }

    return {
        type: types.DELETE_TRANSFER,
        result,
        errors
    };
};

//EDIT
const editAccount = (id) => ({
    type: types.EDIT_ACCOUNT,
    id
});

const finishEditAccount = () => ({
    type: types.FINISH_EDIT_ACCOUNT
});

const clearErrors = () => ({
    type: types.CLEAR_ERRORS
});

export default {
    fetchAccounts,
    receiveAccounts,

    requestSaveAccount,
    receiveSaveAccount,

    requestArchiveAccount,
    receiveArchiveAccount,

    deleteAccount,
    receiveDeleteAccount,

    fetchTransfers,
    receiveTransfers,

    saveTransfer,
    receiveSaveTransfer,

    deleteTransfer,
    receiveDeleteTransfer,

    editAccount,
    finishEditAccount,

    clearErrors
};
