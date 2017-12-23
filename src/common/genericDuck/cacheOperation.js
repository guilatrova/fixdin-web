import { operations, selectors } from '../../app/duck';

const cacheOperation = (operation, timeout) => (dispatch, getState) => {
    const cache = selectors.getCacheFromId(getState(), operation.getId());

    if (Date.now() - cache.time > timeout) {
        operation.onSucceed = () => {
            operation.onSucceed();
            operations.cacheResponse(operation.getId(), Date.now());
        };
        return operation.dispatch()(dispatch, getState);
    }

    return Promise.resolve();
};

export default cacheOperation;