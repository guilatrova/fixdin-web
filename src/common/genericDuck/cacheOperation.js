import { operations, selectors } from '../../app/duck';

const cacheResponse = operations.cacheResponse; // To avoid mess up with operation object

const cacheOperation = (operation, timeout) => (dispatch, getState) => {
    timeout = timeout * 1000 * 60;  // To minutes
    const cache = selectors.getCacheFromId(getState(), operation.getId());
    const isStale = cache ? (Date.now() - cache.time) > timeout : true;

    if (isStale) {
        // Do API request as usual, but when succeed cache result
        operation.onGetResponse = (response) => {
            dispatch(cacheResponse(operation.getId(), Date.now(), response.data));
            return response.data;
        };
    }    
    else {
        // Don't do any request, use cached result
        operation.getApiPromise = () => {
            return Promise.resolve(cache.result);
        };
        operation.onGetResponse = (data) => {
            return data;
        };
    }

    return operation.dispatch()(dispatch, getState);
};

export default cacheOperation;