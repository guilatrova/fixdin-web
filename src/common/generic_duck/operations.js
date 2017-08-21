import createApi from './../../services/api';
import handleError from './../../services/genericErrorHandler';

export class Operation {
    constructor(requestAction, receiveAction) {
        this.requestAction = requestAction;
        this.receiveAction = receiveAction;
    }

    dispatch = () => (dispatch) => {
        this.onRequest(dispatch, this.requestAction);
        
        const api = createApi();
        return this.getApiPromise(api)
            .then(response => response.data)
            .then(data => this.onSucceed(dispatch, this.receiveAction, this.getSucceedData(data)))
            .catch(err => this.onFailed(dispatch, this.receiveAction, err))
    }
    
    onRequest(dispatch, requestAction) {
        dispatch(requestAction());
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data));
        return data;
    }

    onFailed(dispatch, receiveAction, errors) {
        dispatch(receiveAction('fail', handleError(errors)));
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

    getApiPromise(api) {
        return api.get(this.endpoint);
    }
}

const createGetOperation = (endpoint, requestAction, receiveAction, getData) => {
    const operation = new GetOperation(endpoint, requestAction, receiveAction);
    if (getData)
        operation.getSucceedData = getData;
    return operation.dispatch;
};

export default createGetOperation;