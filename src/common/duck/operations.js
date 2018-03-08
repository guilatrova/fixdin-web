/* eslint-disable no-unused-vars */
import createApi from './../../services/api';
import handleError from './../../services/genericErrorHandler';

export class Operation {
    constructor(requestAction, receiveAction) {
        this.requestAction = requestAction;
        this.receiveAction = receiveAction;
    }

    dispatch = () => (dispatch, getState) => {
        if (!this.shouldDispatch(getState)) {
            this.onNotDispatched(dispatch, getState);
            return Promise.resolve();
        }

        this.onRequest(dispatch, this.requestAction);
        
        const api = this.createApiService();
        return this.getApiPromise(api)
            .then(response => this.onGetResponse(response))
            .then(data => this.onSucceed(dispatch, this.receiveAction, this.getSucceedData(data)))
            .catch(err => this.onFailed(dispatch, this.receiveAction, err));
    }

    shouldDispatch(getState) {
        return true;
    }

    onNotDispatched(dispatch, getState) { } 

    createApiService() {
        return createApi();
    }

    onGetResponse(response) {
        return response.data;
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
    constructor(requestAction, receiveAction) {
        super(requestAction, receiveAction);
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data));
        return data;
    }
    
    getEndpoint() { }

    getApiPromise(api) {
        return api.get(this.getEndpoint());
    }
}

export class DeleteOperation extends Operation {
    constructor(requestAction, receiveAction, id) {
        super(requestAction, receiveAction);
        this.id = id;
    }

    dispatch = () => (dispatch) => {
        this.onRequest(dispatch, this.requestAction, this.id);
        
        const api = createApi();
        return this.getApiPromise(api, this.id)
            .then(response => response.data)
            .then(data => this.onSucceed(dispatch, this.receiveAction, this.getSucceedData(data), this.id))
            .catch(err => this.onFailed(dispatch, this.receiveAction, err, this.id));
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

    getEndpoint(id) { }

    getApiPromise(api, id) {
        const endpoint = this.getEndpoint(id);
        return api.delete(endpoint);
    }
}

export const createGetOperation = (endpoint, requestAction, receiveAction, getData) => {
    const operation = new GetOperation(endpoint, requestAction, receiveAction);
    if (getData)
        operation.getSucceedData = getData;
    return operation.dispatch;
};