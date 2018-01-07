const getAccounts = (state) => state.accounts.accounts;

const getErrors = (state) => state.accounts.errors;

const getIsFetching = (state) => state.accounts.isFetching;

export default {
    getAccounts,
    getErrors,
    getIsFetching
};