import moment from 'moment';
import actions from './actions';
import types from './types';
import selectors from './selectors';
import handleError from '../../../services/genericErrorHandler';
import { formatTransactionToSend, formatFilters } from '../formatters';
import { formatDate } from '../../../utils/formatters';
import getQueryParams from '../../../services/query';
import { Operation, GetOperation } from './../../../common/duck/operations';

export class FetchOperation extends GetOperation {
    constructor(kind) {
        super(actions.requestTransactions, actions.receiveTransactions);
        this.kind = kind;
    }

    getEndpoint = () => this.kind.apiEndpoint;
}

export class FilterOperation extends GetOperation {
    constructor(filters) {
        super(actions.requestFilterTransactions, actions.receiveFilteredTransactions);
        this.filters = filters;
    }

    getEndpoint() {
        const { kind, ...filters } = formatFilters(this.filters);
        const queryParams = getQueryParams(filters);
        
        return `${kind.apiEndpoint}${queryParams}`;
    }
}

export class SaveOperation extends Operation {
    constructor(transaction, kind, type) {
        super(actions.requestSaveTransaction, actions.receiveSaveTransaction);    
        this.transaction = transaction;
        this.kind = kind;
        this.type = type;
    }

    onRequest(dispatch, requestAction) {
        dispatch(requestAction(this.type));
    }

    onSucceed(dispatch, receiveAction, data) {
        return dispatch(receiveAction('success', data, this.type));        
    }

    onFailed(dispatch, receiveAction, errors) {
        return dispatch(receiveAction('fail', handleError(errors), this.type));
    }
    
    getSucceedData = (raw) => Array.isArray(raw) ? raw : [raw];

    getApiPromise(api) {
        const { transaction, kind } = this;
        const data = formatTransactionToSend(transaction, kind);
        const baseEndpoint = kind.apiEndpoint;

        switch (this.type) {
            case types.SAVE_ALL_PERIODIC_TRANSACTIONS:
                return api.patch(`${baseEndpoint}?periodic_transaction=${transaction.bound_transaction}`, data);

            case types.SAVE_THIS_AND_NEXT_TRANSACTIONS:
                return api.patch(`${baseEndpoint}${transaction.id}?next=1`, data);

            case types.SAVE_TRANSACTION:
                if (transaction.id)
                    return api.put(baseEndpoint + transaction.id, data);        

                return api.post(baseEndpoint, data);
        }
    }
}

export class DeleteOperation extends Operation {
    constructor(id, kind, type) {
        super(actions.requestDeleteTransaction, actions.receiveDeleteTransaction);
        this.id = id;
        this.kind = kind;
        this.type = type;
    }

    onRequest(dispatch, requestAction) {
        const { id, type } = this;
        dispatch(requestAction(id, type));
    }

    onSucceed(dispatch, receiveAction) {
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

export class PayOperation extends Operation {
    constructor(kind, ids, revert) {
        super(actions.payTransactions, actions.receivePayTransactions);
        this.kind = kind;
        this.ids = ids;
        this.revert = revert;
    }

    getSucceedData = (raw) => Array.isArray(raw) ? raw : [raw];

    getEndpoint() {
        const { ids, kind } = this;

        // It can be /?ids=1,2 or /1
        const queryParams = Array.isArray(ids) ? `?ids=${ids.join(',')}` : ids;
        return kind.apiEndpoint + queryParams;
    }

    getApiPromise(api) {
        const payment_date = this.revert ? null : formatDate(moment());
        const data = { payment_date };
        const url = this.getEndpoint();

        return api.patch(url, data);
    }
}

export class FetchOldestExpense extends GetOperation {
    constructor() {
        super(actions.fetchOldestPendingExpense, actions.receiveOldestPendingExpense);
    }

    getEndpoint = () => "transactions/oldest-pending-expense/";
}

const copyTransaction = actions.copyTransaction;
const editTransaction = actions.editTransaction;
const finishEditTransaction = actions.finishEditTransaction;
const clearFilters = actions.clearFilters;
const setFilters = actions.setFilters;
const fetchTransactions = (kind) => new FetchOperation(kind).dispatch();
const saveTransaction = (transaction, kind, type) => new SaveOperation(transaction, kind, type).dispatch();
const deleteTransaction = (id, kind, type) => new DeleteOperation(id, kind, type).dispatch();
const payTransactions = (kind, ids, revert=false) => new PayOperation(kind, ids, revert).dispatch();
const filterTransactions = () => (dispatch, getState) => {
    const filters = selectors.getFilters(getState());
    return new FilterOperation(filters).dispatch()(dispatch, getState);
};
const fetchOldestExpense = () => new FetchOldestExpense().dispatch();

export default {
    copyTransaction,
    editTransaction,
    finishEditTransaction,
    fetchTransactions,
    filterTransactions,
    clearFilters,
    setFilters,
    saveTransaction,
    deleteTransaction,
    payTransactions,
    fetchOldestExpense
};