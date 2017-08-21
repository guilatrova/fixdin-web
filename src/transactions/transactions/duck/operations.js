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

}

function update(id, data, kind) {
    const api = createApi();
    return api.put(kind.apiEndpoint + id, data);
}

function create(data, kind) {
    const api = createApi();
    return api.post(kind.apiEndpoint, data);
}

const copyTransaction = actions.copyTransaction;
const editTransaction = actions.editTransaction;
const finishEditTransaction = actions.finishEditTransaction;
const fetchTransactions = (kind, filters = undefined) => new FetchOperation(kind, filters).dispatch();
const deleteTransaction = (id, kind) => new DeleteOperation(id, kind).dispatch();


const saveTransaction = (transaction, kind) => (dispatch) => {    
    dispatch(actions.requestSaveTransaction());
            
    const data = formatTransactionToSend(transaction, kind);
    
    let apiPromise = (transaction.id) ? update(transaction.id, data, kind) : create(data, kind);
    
    return apiPromise
        .then(response => response.data)
        .then(data => dispatch(actions.receiveSaveTransaction('success', data)))
        .catch(err => dispatch(actions.receiveSaveTransaction('fail', handleError(err))))    
};


// (dispatch) => {
//     dispatch(actions.requestDeleteTransaction(id));

//     const api = createApi();
//     return api.delete(kind.apiEndpoint + id)
//         .then(() => dispatch(actions.receiveDeleteTransaction(id, 'success')))
//         .catch(err => dispatch(actions.receiveDeleteTransaction(id, 'fail', handleError(err))))    
// };

export default {
    copyTransaction,
    editTransaction,
    finishEditTransaction,
    fetchTransactions,
    saveTransaction,
    deleteTransaction
};