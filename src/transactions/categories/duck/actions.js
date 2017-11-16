import types from './types';

//FETCH
function requestCategories() {
    return {
        type: types.FETCH_TRANSACTION_CATEGORIES
    };
}

function receiveCategories(result, data, kind) {
    if (result == 'success') {
        return {
            type: types.FETCH_TRANSACTION_CATEGORIES,
            result,
            kind,
            categories: data
        };
    }

    return {
        type: types.FETCH_TRANSACTION_CATEGORIES,
        result,
        errors: data
    };
}

//SAVE
function requestSaveCategory() {
    return {
        type: types.SAVE_TRANSACTION_CATEGORY
    };
}

function receiveSaveCategory(result, data) {
    if (result === 'success') {
        return {
            type: types.SAVE_TRANSACTION_CATEGORY,            
            result,
            category: data
        };
    }

    return {
        type: types.SAVE_TRANSACTION_CATEGORY,
        result,
        errors: data
    };
}

//EDIT
function editCategory(id) {
    return {
        type: types.EDIT_TRANSACTION_CATEGORY,
        id
    };
}

function finishEditCategory() {
    return {
        type: types.FINISH_EDIT_TRANSACTION_CATEGORY
    };
}

//DELETE
function requestDeleteCategory(id) {
    return {
        type: types.DELETE_TRANSACTION_CATEGORY,
        id
    };
}

function receiveDeleteCategory(id, result, errors) {
    if (result == 'success') {
        return {
            type: types.DELETE_TRANSACTION_CATEGORY,
            id,
            result
        };
    }

    return {
        type: types.DELETE_TRANSACTION_CATEGORY,
        result,
        errors
    };
}

export default {
    requestCategories,
    receiveCategories,
    requestSaveCategory,
    receiveSaveCategory,
    editCategory,
    finishEditCategory,
    requestDeleteCategory,
    receiveDeleteCategory
};