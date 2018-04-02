const getAccounts = (state) => state.accounts.accounts;

const getAccount = (state, id) => getAccounts(state).find(account => account.id == id);

const getErrors = (state) => state.accounts.errors;

const isFetching = (state) => state.accounts.isFetching;

const getEditingAccount = (state) => state.accounts.editingAccount;

const getTransfers = (state) => state.accounts.transfers;

const getTransfersOfAccount = (state, accountId) => getTransfers(state)
    .filter(transfer => transfer.account_from == accountId || transfer.account_to == accountId);

const getAccountsNamesMappedById = (state) => getAccounts(state).reduce((prev, account) => {
    prev[account.id] = account.name;
    return prev;
}, []);

export default {
    getAccounts,
    getAccount,
    getErrors,
    isFetching,
    getEditingAccount,
    getTransfers,
    getTransfersOfAccount,
    getAccountsNamesMappedById
};