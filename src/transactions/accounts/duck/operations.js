import types from './types';
import actions from './actions';
import { Operation, DeleteOperation } from './../../../common/genericDuck/operations';
import cache, { resetCache } from '../../../common/genericDuck/cacheOperation';

class FetchAccountsOperation extends Operation {
    constructor() {
        super(actions.fetchAccounts, actions.receiveAccounts);
    }

    getId() {
        return types.FETCH_ACCOUNTS;
    }

    getApiPromise(api) {
        return api.get(`accounts/`);
    }
}

class SaveAccountOperation extends Operation {
    constructor(id, account) {
        super(actions.requestSaveAccount, actions.receiveSaveAccount);
        this.id = id;
        this.account = account;
    }

    getApiPromise(api) {
        const { id, account } = this;
        if (id)
            return api.put(`accounts/${id}`, account);

        return api.post(`accounts/`, account);
    }
}

class SaveTransferOperation extends Operation {
    constructor(value, from, to) {
        super(actions.saveTransfer, actions.receiveSaveTransfer);
        this.value = value;
        this.from = from;
        this.to = to;
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(new FetchAccountsOperation().dispatch()); //Fetch all accounts again
        return super.onSucceed(dispatch, receiveAction, data);
    }

    getApiPromise(api) {
        const { value, from, to } = this;
        const transfer = {
            account_from: from,
            account_to: to,
            value
        };

        return api.post(`accounts/transfers`, transfer);
    }    
}

class FetchTransfersOperation extends Operation {
    constructor(accountId = "") {
        super(actions.fetchTransfers, actions.receiveTransfers);
        this.accountId = accountId;
    }

    getId() {
        return types.FETCH_TRANSFERS + this.accountId;
    }

    getApiPromise(api) {
        const { accountId } = this;
        if (accountId) {
            return api.get(`accounts/${accountId}/transfers`);
        }

        return api.get('accounts/transfers');
    }
}

class DeleteTransferOperation extends DeleteOperation {
    constructor(id) {
        super(actions.deleteTransfer, actions.receiveDeleteTransfer, id);
    }

    getEndpoint = (id) => `accounts/transfers/${id}`;
}

const editAccount = actions.editAccount;
const finishEditAccount = actions.finishEditAccount;
const fetchAccounts = (timeout = 15) => cache(new FetchAccountsOperation(), timeout);
const saveAccount = (id, account) => resetCache(types.FETCH_ACCOUNTS, new SaveAccountOperation(id, account)).dispatch();

const saveTransfer = (value, from, to) => resetCache(types.FETCH_TRANSFERS, new SaveTransferOperation(value, from, to)).dispatch();
const fetchTransfers = (accountId = "", timeout = 15) => cache(new FetchTransfersOperation(accountId), timeout);
const deleteTransfer = (id) => resetCache(types.FETCH_TRANSFERS, new DeleteTransferOperation(id)).dispatch();

export default {
    fetchAccounts,
    saveAccount,
    editAccount,
    finishEditAccount,
    fetchTransfers,
    saveTransfer,
    deleteTransfer,
};