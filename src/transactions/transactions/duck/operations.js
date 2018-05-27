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
    constructor() {
        super(actions.requestTransactions, actions.receiveTransactions);
    }

    getEndpoint = () => "transactions/";
}

export class FilterOperation extends GetOperation {
    constructor(filters) {
        super(actions.requestFilterTransactions, actions.receiveFilteredTransactions);
        this.filters = filters;
    }

    getEndpoint() {
        const filters = formatFilters(this.filters);
        const queryParams = getQueryParams(filters);
        
        return `transactions/${queryParams}`;
    }
}

export class SaveOperation extends Operation {
    constructor(transaction, type) {
        super(actions.requestSaveTransaction, actions.receiveSaveTransaction);    
        this.transaction = transaction;
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
        const { transaction } = this;
        const data = formatTransactionToSend(transaction);

        switch (this.type) {
            case types.SAVE_ALL_PERIODIC_TRANSACTIONS:
                return api.patch(`transactions/?periodic_transaction=${transaction.bound_transaction}`, data);

            case types.SAVE_THIS_AND_NEXT_TRANSACTIONS:
                return api.patch(`transactions/${transaction.id}?next=1`, data);

            case types.SAVE_TRANSACTION:
                if (transaction.id)
                    return api.put(`transactions/${transaction.id}`, data);        

                return api.post("transactions/", data);
        }
    }
}

export class DeleteOperation extends Operation {
    constructor(id, type) {
        super(actions.requestDeleteTransaction, actions.receiveDeleteTransaction);
        this.id = id;
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
        const { id, type } = this;
        const endpoint = "transactions/";
        
        if (type == types.DELETE_TRANSACTION)
            return `${endpoint}${id}`;

        if (type == types.DELETE_THIS_AND_NEXT_TRANSACTIONS)
            return `${endpoint}${id}?next=1`;

        if (type == types.DELETE_ALL_PERIODIC_TRANSACTIONS)
            return `${endpoint}?periodic_transaction=${id}`;
    }

    getApiPromise(api) {
        return api.delete(this.getEndpoint());
    }
}

export class PayOperation extends Operation {
    constructor(ids, revert) {
        super(actions.payTransactions, actions.receivePayTransactions);
        this.ids = ids;
        this.revert = revert;
    }

    getSucceedData = (raw) => Array.isArray(raw) ? raw : [raw];

    getEndpoint() {
        const { ids } = this;

        // It can be /?ids=1,2 or /1
        const queryParams = Array.isArray(ids) ? `?ids=${ids.join(',')}` : ids;
        return "transactions/" + queryParams;
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
const fetchTransactions = () => new FetchOperation().dispatch();
const saveTransaction = (transaction, type) => new SaveOperation(transaction, type).dispatch();
const deleteTransaction = (id, type) => new DeleteOperation(id, type).dispatch();
const payTransactions = (ids, revert=false) => new PayOperation(ids, revert).dispatch();
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