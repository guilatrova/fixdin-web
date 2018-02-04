import types from './types';

const cacheResponse = (id, time, result) => {
    return {
        type: types.CACHE_RESPONSE,
        request: {
            id,
            time,
            result
        }
    };
};

const resetCache = (id) => {
    return {
        type: types.RESET_CACHE,
        id        
    };
};

export default {
    cacheResponse,
    resetCache
};