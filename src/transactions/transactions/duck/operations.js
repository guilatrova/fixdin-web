import actions from './actions';
import types from './types';
import createApi from '../../../services/api';
import handleError from '../../../services/genericErrorHandler';
import { formatTransactionToSend } from '../../../services/formatter';
import getQueryParams from '../../../services/query';
import { Operation } from './../../../common/genericDuck/operations';

class FetchOperation extends Operation {
    constructor(kind, filters) {
        super(actions.requestTransactions, actions.receiveTransactions);
        this.kind = kind;
        this.filters = filters;

        return this.dispatch();
    }

    getApiPromise(api) {
        const queryParams = getQueryParams(this.filters);
        return api.get(this.kind.apiEndpoint + queryParams);
    }
}

class SaveOperation extends Operation {
    constructor(transaction, kind) {
        super(actions.requestSaveTransaction, actions.receiveSaveTransaction);    
        this.transaction = transaction;
        this.kind = kind;
        
        return this.dispatch();
    }

    getApiPromise(api) {
        const { transaction, kind } = this;
        const data = formatTransactionToSend(transaction, kind);

        if (transaction.id)
            return api.put(kind.apiEndpoint + transaction.id, data);

        return api.post(kind.apiEndpoint, data);
    }

    getSucceedData(raw) {
        if (Array.isArray(raw))
            return raw;

        return [raw];
    }
}

class DeleteOperation extends Operation {
    constructor(id, kind, type) {
        super(actions.requestDeleteTransaction, actions.receiveDeleteTransaction);
        this.id = id;
        this.kind = kind;
        this.type = type;
        console.log(type);

        return this.dispatch();
    }

    onRequest(dispatch, requestAction) {
        const { id, type } = this;
        dispatch(requestAction(id, type));
    }

    onSucceed(dispatch, receiveAction, data) {
        const { id, type } = this;
        return dispatch(receiveAction('success', id, type));
    }

    onFailed(dispatch, receiveAction, errors) {
        const { id, type } = this;
        return dispatch(receiveAction('fail', id, type, handleError(errors)));
    }

    getEndpoint() {
        const { id, kind, type } = this;
        const kindEndpoint = kind.apiEndpoint;
        
        if (type == types.DELETE_TRANSACTION)
            return `${kindEndpoint}${id}`;

        if (type == types.DELETE_THIS_AND_NEXT_TRANSACTIONS)
            return `${kindEndpoint}${id}?next=1`;

        if (type == types.DELETE_ALL_PERIODIC_TRANSACTIONS)
            return `${kindEndpoint}?periodic_transaction=${id}`;
    }

    getApiPromise(api) {
        return api.delete(this.getEndpoint());
    }
}

const copyTransaction = actions.copyTransaction;
const editTransaction = actions.editTransaction;
const finishEditTransaction = actions.finishEditTransaction;
const fetchTransactions = (kind, filters = undefined) => new FetchOperation(kind, filters);
const saveTransaction = (transaction, kind) => new SaveOperation(transaction, kind);
const deleteTransaction = (id, kind, type) => new DeleteOperation(id, kind, type);

export default {
    copyTransaction,
    editTransaction,
    finishEditTransaction,
    fetchTransactions,
    saveTransaction,
    deleteTransaction
};