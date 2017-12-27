import types from './types';

const cacheResponse = (id, time, result) => {
    return {
        type: types.CACHE_RESPONSE,
        cache: {
            id,
            time,
            result
        }
    };
};

export default {
    cacheResponse
};