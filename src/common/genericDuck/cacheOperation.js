/* CACHE Operations
 **** REQUIREMENTS
 *
 * 1. Avoid repeating same requests in a small pre-defined timeout
 * 2. Be transparent to operation and user
 * 3. Act exactly like a regular operation, to meet item 2
 * 4. When stale cache new result x request time
 */
import { operations, selectors } from '../../app/duck';

const cacheResponse = operations.cacheResponse; // To avoid mess up with operation object

const cacheOperation = (operation, timeout) => (dispatch, getState) => {
    const cache = selectors.getCacheFromId(getState(), operation.getId());
    const isStale = cache ? (Date.now() - cache.time) > timeout : true;

    if (isStale) {
        // Do API request as usual, but when succeed cache result
        operation.onGetResponse = (response) => {
            dispatch(cacheResponse(operation.getId(), Date.now(), response));
            return response.data;
        };
    }    
    else {
        // Don't do any request, use cached result
        operation.getApiPromise = () => {
            return Promise.resolve(cache.result);
        };        
    }

    return operation.dispatch()(dispatch, getState);
};

export default cacheOperation;