const getAccounts = (state) => state.accounts.accounts;

const getErrors = (state) => state.accounts.errors;

const getIsFetching = (state) => state.accounts.isFetching;

const getEditingAccount = (state) => state.accounts.editingAccount;

const getTransfers = (state) => state.accounts.transfers;

export default {
    getAccounts,
    getErrors,
    getIsFetching,
    getEditingAccount,
    getTransfers
};