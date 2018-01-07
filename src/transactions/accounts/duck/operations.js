import actions from './actions';
import { Operation } from './../../../common/genericDuck/operations';
import cache from '../../../common/genericDuck/cacheOperation';

class FetchOperation extends Operation {
    constructor() {
        super(actions.fetchAccounts, actions.receiveAccounts);
    }

    getApiPromise(api) {
        return api.get(`accounts`);
    }
}

class SaveOperation extends Operation {
    constructor(id, account) {
        super(actions.requestSaveAccount, actions.receiveSaveAccount);
        this.id = id;
        this.account = account;
    }

    getApiPromise(api) {
        const { id, account } = this;
        if (id)
            return api.put(`accounts/${id}`, account);

        return api.post(`accounts`, account);
    }
}

class TransferOperation extends Operation {
    constructor(value, from, to) {
        super(actions.requestTransfer, actions.receiveTransfer);
        this.value = value;
        this.from = from;
        this.to = to;
    }

    getApiPromise(api) {
        const { value, from, to } = this;
        const transfer = {
            value,
            to
        };

        return api.post(`accounts/${from}/transfers`, transfer);
    }
}

const fetchAccounts = (timeout = 0) => cache(new FetchOperation(), timeout);
const saveAccount = (id, account) => new SaveOperation(id, account).dispatch();
const transferBetweenAccounts = (value, from, to) => new TransferOperation(value, from, to).dispatch();

export default {
    fetchAccounts,
    saveAccount,
    transferBetweenAccounts
};