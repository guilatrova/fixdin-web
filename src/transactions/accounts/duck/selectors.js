const getAccounts = (state) => state.accounts.accounts;

const getErrors = (state) => state.accounts.errors;

const getIsFetching = (state) => state.accounts.isFetching;

const getEditingAccount = (state) => state.accounts.editingAccount;

export default {
    getAccounts,
    getErrors,
    getIsFetching,
    getEditingAccount
};