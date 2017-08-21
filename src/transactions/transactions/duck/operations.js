import actions from './actions';
import createApi from '../../../services/api';
import handleError from '../../../services/genericErrorHandler';
import { formatTransactionToSend } from '../../../services/formatter';
import getQueryParams from '../../../services/query';
import { Operation, createDeleteOperation } from './../../../common/generic_duck/operations';

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
}

const copyTransaction = actions.copyTransaction;
const editTransaction = actions.editTransaction;
const finishEditTransaction = actions.finishEditTransaction;
const fetchTransactions = (kind, filters = undefined) => new FetchOperation(kind, filters);
const saveTransaction = (transaction, kind) => new SaveOperation(transaction, kind);
const deleteTransaction = createDeleteOperation(
    actions.requestDeleteTransaction, 
    actions.receiveDeleteTransaction, 
    (id, extra) => extra[0].apiEndpoint + id //kind
);

export default {
    copyTransaction,
    editTransaction,
    finishEditTransaction,
    fetchTransactions,
    saveTransaction,
    deleteTransaction
};