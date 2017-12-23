import types from './types';

const cacheResponse = (id, time) => {
    return {
        type: types.CACHE_RESPONSE,
        cache: {
            id,
            time
        }
    };
};

export default {
    cacheResponse
};