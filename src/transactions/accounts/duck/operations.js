import actions from './actions';
import { Operation, DeleteOperation } from './../../../common/duck/operations';
import { ARCHIVED_STATUS } from '../status';

class FetchAccountsOperation extends Operation {
    constructor() {
        super(actions.fetchAccounts, actions.receiveAccounts);
    }

    getApiPromise = api => api.get(`accounts/`);
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

class ArchiveAccountOperation extends Operation {
    constructor(id, account) {
        super(actions.requestArchiveAccount, actions.receiveArchiveAccount);
        this.id = id;
        this.account = account;
    }

    getApiPromise(api) {
        const { id } = this;
        return api.patch(`accounts/${id}`, { status: ARCHIVED_STATUS });
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
const fetchAccounts = () => new FetchAccountsOperation().dispatch();
const saveAccount = (id, account) => new SaveAccountOperation(id, account).dispatch();
const archiveAccount = (id, account) => new ArchiveAccountOperation(id, account).dispatch();
const saveTransfer = (value, from, to) => new SaveTransferOperation(value, from, to).dispatch();
const fetchTransfers = (accountId = "") => new FetchTransfersOperation(accountId).dispatch();
const deleteTransfer = (id) => new DeleteTransferOperation(id).dispatch();

export default {
    fetchAccounts,
    saveAccount,
    archiveAccount,
    editAccount,
    finishEditAccount,
    fetchTransfers,
    saveTransfer,
    deleteTransfer,
};
