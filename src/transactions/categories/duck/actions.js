import types from './types';

//FETCH
const requestCategories = () => ({
    type: types.FETCH_TRANSACTION_CATEGORIES
});

const receiveCategories = (result, data) => {
    if (result == 'success') {
        return {
            type: types.FETCH_TRANSACTION_CATEGORIES,
            result,
            categories: data
        };
    }

    return {
        type: types.FETCH_TRANSACTION_CATEGORIES,
        result,
        errors: data
    };
};

//SAVE
const requestSaveCategory = () => ({
    type: types.SAVE_TRANSACTION_CATEGORY
});

const  receiveSaveCategory = (result, data) => {
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
};

//EDIT
const editCategory = (id) => ({
    type: types.EDIT_TRANSACTION_CATEGORY,
    id
});

const finishEditCategory = () => ({
    type: types.FINISH_EDIT_TRANSACTION_CATEGORY
});

//DELETE
const requestDeleteCategory = (id) => ({
    type: types.DELETE_TRANSACTION_CATEGORY,
    id
});

const receiveDeleteCategory = (id, result, errors) => {
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
};

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