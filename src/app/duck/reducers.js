import types from './types';

const initialState = {
    cache: []
};

const saveCache = (state, action) => {
    const { cache } = state;
    const updateCache = cache.find(request => request.id == action.request.id);

    if (updateCache) {
        const index = cache.indexOf(updateCache);
        return {
            ...state,
            cache: [
                ...cache.slice(0, index),
                action.request,
                ...cache.slice(index + 1)
            ]
        };
    }

    return {
        ...state,
        cache: [ ...state.cache, action.request ]
    };
}

const resetCache = (state, action, partialId) => {
    if (action.result == 'success') {
        const { cache } = state;
        const resetCaches = cache
            .filter(request => request.id.startsWith(partialId))
            .map(cache => ({ ...cache, time: -1 }));
        const resetedIds = resetCaches.map(x => x.id);
        const unchangedCaches = cache.filter(cache => !resetedIds.includes(cache.id));

        return {
            ...state,
            cache: [
                ...resetCaches,
                ...unchangedCaches
            ]
        };
    }

    return state;
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.CACHE_RESPONSE:
            return saveCache(state, action);
            
        case types.RESET_CACHE:
            return resetCache(state, {result:'success'}, action.id);
        
        default: 
            return state;
    }
}