import types from './types';

const initialState = {
    cache: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.CACHE_RESPONSE: {
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
        
        default: 
            return state;
    }
}