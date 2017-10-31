import types from './types';

const initialState = {
    isFetching: false,
    errors: {},
    settings: {},
    historic: []
}

function receiveSettingsReducer(state, action) {
    switch(action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false,                
                settings: action.settings
            }

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors: action.errors
            }

        default:
            return {
                ...state,
                isFetching: true                
            }
    }
}

function runServiceReducer(state, action) {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                historic: [
                    ...state.historic,
                    action.history                    
                ]
            }

        case 'fail':
            return {
                ...state,
                isFetching: false,
                errors: action.errors
            }

        default:
            return {
                ...state,
                isFetching: true,
                errors: {}
            }
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_SETTINGS:
        case types.UPDATE_SETTINGS:
            return receiveSettingsReducer(state, action);

        case types.RUN_SERVICE:
            return runServiceReducer(state, action);

        default:
            return state;
    }
}