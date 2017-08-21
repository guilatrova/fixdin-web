import types from './types';

const initialState = {
    isFetching: false,
    errors: {},
    categories: [],
    editingCategory: {}
}

function saveReducer(state, action) {
    switch (action.result) {
        case 'success':
            const { categories } = state;
            const updatedCategory = categories.find(item => item.id == action.category.id);

            if (updatedCategory) {
                const index = categories.indexOf(updatedCategory);

                return {
                    ...state,
                    isFetching: false,
                    categories: [
                        ...categories.slice(0, index),
                        action.category,
                        ...categories.slice(index + 1)
                    ]
                }
            }

            return {
                ...state,
                isFetching: false,
                categories: state.categories.concat(action.category)                
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

function fetchReducer(state, action) {
    switch(action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false,                
                categories: [
                    ...state.categories.filter(category => category.kind != action.kind.id),
                    ...action.categories
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
                isFetching: true                
            }
    }
}

function deleteReducer(state, action) {
    switch(action.result) {
        case 'success':
            return {
                ...state,
                isFetching: false,
                categories: state.categories.filter(category => category.id != action.id)
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

export default function reducer(state = initialState, action) {    
    switch (action.type) {
        case types.SAVE_TRANSACTION_CATEGORY:
            return saveReducer(state, action);

        case types.FETCH_TRANSACTION_CATEGORIES:
            return fetchReducer(state, action);

        case types.DELETE_TRANSACTION_CATEGORY:
            return deleteReducer(state, action);

        case types.EDIT_TRANSACTION_CATEGORY:
            return {
                ...state,
                editingCategory: state.categories.find(category => category.id == action.id)
            }

        case types.FINISH_EDIT_TRANSACTION_CATEGORY:
            return {
                ...state,
                editingCategory: {},
                errors: {}
            }        

        default:
            return state;
    }
}