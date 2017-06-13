import { 
    SAVE_TRANSACTION_CATEGORY, 
    FETCH_TRANSACTION_CATEGORIES,
    EDIT_TRANSACTION_CATEGORY,
    FINISH_EDIT_TRANSACTION_CATEGORY
} from './actions';

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
                categories: action.categories
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
        case SAVE_TRANSACTION_CATEGORY:
            return saveReducer(state, action);

        case FETCH_TRANSACTION_CATEGORIES:
            return fetchReducer(state, action);

        case EDIT_TRANSACTION_CATEGORY:
            return {
                ...state,
                editingCategory: state.categories.find(category => category.id == action.id)
            }

        case FINISH_EDIT_TRANSACTION_CATEGORY:
            return {
                ...state,
                editingCategory: {}
            }

        default:
            return state;
    }
}