import actions from './actions';
import createApi from '../../../services/api';
import handleError from '../../../services/genericErrorHandler';
import { formatTransactionToSend } from '../../../services/formatter';
import getQueryParams from '../../../services/query';
import createOperation, { Operation } from './../../../common/generic_duck/operations';

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

class DeleteOperation extends Operation {
    constructor(id, kind) {
        super(actions.requestDeleteTransaction, actions.receiveDeleteTransaction);
        this.id = id;
        this.kind = kind;

        return this.dispatch();
    }
    
    getApiPromise(api) {
        return api.delete(this.kind.apiEndpoint + this.id);
    }

    onRequest(dispatch, requestAction) {
        dispatch(requestAction(this.id));
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction(this.id, 'success'));
    }

    onFailed(dispatch, receiveAction, errors) {
        dispatch(receiveAction(this.id, 'fail', handleError(errors)));
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
}

const copyTransaction = actions.copyTransaction;
const editTransaction = actions.editTransaction;
const finishEditTransaction = actions.finishEditTransaction;
const fetchTransactions = (kind, filters = undefined) => new FetchOperation(kind, filters);
const deleteTransaction = (id, kind) => new DeleteOperation(id, kind);
const saveTransaction = (transaction, kind) => new SaveOperation(transaction, kind);

export default {
    copyTransaction,
    editTransaction,
    finishEditTransaction,
    fetchTransactions,
    saveTransaction,
    deleteTransaction
};