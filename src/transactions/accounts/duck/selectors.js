import commonSelectors from '../../../common/duck/selectors';
import { ACTIVE_STATUS } from '../status';

const isFetching = (state, type) => commonSelectors.isFetching(state.accounts, type);

const getAccounts = (state) => state.accounts.accounts;

const getActiveAccounts = (state) => state.accounts.accounts.filter(account => account.status == ACTIVE_STATUS);

const getAccount = (state, id) => getAccounts(state).find(account => account.id == id);

const getErrors = (state) => state.accounts.errors;

const getEditingAccount = (state) => state.accounts.editingAccount;

const getTransfers = (state) => state.accounts.transfers;

const getTransfersOfAccount = (state, accountId) => getTransfers(state)
    .filter(transfer => transfer.account_from == accountId || transfer.account_to == accountId);

// Candidate for removal
const getAccountsNamesMappedById = (state) => getAccounts(state).reduce((prev, account) => {
    prev[account.id] = account.name;
    return prev;
}, []);

export default {
    getAccounts,
    getActiveAccounts,
    getAccount,
    getErrors,
    isFetching,
    getEditingAccount,
    getTransfers,
    getTransfersOfAccount,
    getAccountsNamesMappedById
};
