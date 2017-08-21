import createApi from './../../services/api';
import handleError from './../../services/genericErrorHandler';

export class Operation {
    constructor(requestAction, receiveAction) {
        this.requestAction = requestAction;
        this.receiveAction = receiveAction;
    }

    dispatch = () => (dispatch) => {
        dispatch(this.requestAction());
        
        const api = createApi();
        return this.getApiPromise(api)
            .then(response => response.data)
            .then(data => this.onSucceed(dispatch, this.getSucceedData(data)))
            .catch(err => this.onFailed(dispatch, err))
    }

    onSucceed(dispatch, data) {
        dispatch(this.receiveAction('success', data));
        return data;
    }

    onFailed(dispatch, errors) {
        dispatch(this.receiveAction('fail', handleError(errors)));
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

const createOperation = (endpoint, requestAction, receiveAction, getData) => {
    const operation = new GetOperation(endpoint, requestAction, receiveAction);
    if (getData)
        operation.getSucceedData = getData;
    return operation.dispatch;
};

export default createOperation;