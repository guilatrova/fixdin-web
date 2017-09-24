import createApi from './../../services/api';
import handleError from './../../services/genericErrorHandler';

export class Operation {
    constructor(requestAction, receiveAction) {
        this.requestAction = requestAction;
        this.receiveAction = receiveAction;
    }

    dispatch = () => (dispatch) => {
        this.onRequest(dispatch, this.requestAction);
        
        console.log(this, 'will call api service');
        const api = this.createApiService();
        return this.getApiPromise(api)
            .then(response => response.data)
            .then(data => this.onSucceed(dispatch, this.receiveAction, this.getSucceedData(data)))
            .catch(err => this.onFailed(dispatch, this.receiveAction, err))
    }

    createApiService() {
        console.log('original Create API called')
        return createApi();
    }
    
    onRequest(dispatch, requestAction) {
        dispatch(requestAction());
    }

    onSucceed(dispatch, receiveAction, data) {
        return dispatch(receiveAction('success', data));        
    }

    onFailed(dispatch, receiveAction, errors) {
        return dispatch(receiveAction('fail', handleError(errors)));
    }

    getSucceedData(raw) {
        return raw;
    }
    
    getApiPromise(api) { }
}

export class GetOperation extends Operation {
    constructor(endpoint, requestAction, receiveAction) {
        super(requestAction, receiveAction);
        this.endpoint = endpoint;
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data));
        return data;
    }

    getApiPromise(api) {
        return api.get(this.endpoint);
    }
}

export class DeleteOperation extends Operation {
    dispatch = (id, ...extra) => (dispatch) => {
        this.onRequest(dispatch, this.requestAction, id);
        
        const api = createApi();
        return this.getApiPromise(api, id, extra)
            .then(response => response.data)
            .then(data => this.onSucceed(dispatch, this.receiveAction, this.getSucceedData(data), id))
            .catch(err => this.onFailed(dispatch, this.receiveAction, err, id))
    }

    onRequest(dispatch, requestAction, id) {
        dispatch(requestAction(id));
    }

    onSucceed(dispatch, receiveAction, data, id) {
        return dispatch(receiveAction(id, 'success'));
    }

    onFailed(dispatch, receiveAction, errors, id) {
        return dispatch(receiveAction(id, 'fail', handleError(errors)));
    }

    getEndpoint(id, extra) {
    }

    getApiPromise(api, id, extra) {
        const endpoint = this.getEndpoint(id, extra);
        return api.delete(endpoint);
    }
}

export const createGetOperation = (endpoint, requestAction, receiveAction, getData) => {
    const operation = new GetOperation(endpoint, requestAction, receiveAction);
    if (getData)
        operation.getSucceedData = getData;
    return operation.dispatch;
};

export const createDeleteOperation = (requestAction, receiveAction, getEndpoint) => {
    const operation = new DeleteOperation(requestAction, receiveAction);
    operation.getEndpoint = getEndpoint;
    return operation.dispatch;
};