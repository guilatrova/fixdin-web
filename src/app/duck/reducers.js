import types from './types';

const initialState = {
    cache: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.CACHE_RESPONSE:
            return {
                ...state,
                cache: [ ...state.cache, action.cache ]
            };
        
            default: 
                return state;
    }
}