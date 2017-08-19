import { combineReducers } from 'redux'
import types from './types';

const initialState = {    
    data: [],
    errors: {}
};

function last13MonthsReducer(state, action) {
    switch (action.result) {
        case 'success':
            return {
                ...state,
                data: action.data,
                errors: {}
            };

        case 'fail':
            return {
                ...state,
                errors: action.errors
            };

        default:
            return state;
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_LAST_13_MONTHS:
            return last13MonthsReducer(state, action);

        default:
            return state;
    }
};