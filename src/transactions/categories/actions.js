import createApi from '../../services/api';

export const FETCH_TRANSACTION_CATEGORIES = 'FETCH_TRANSACTION_CATEGORIES';
export const SAVE_TRANSACTION_CATEGORY = 'SAVE_TRANSACTION_CATEGORY';
export const EDIT_TRANSACTION_CATEGORY = 'EDIT_TRANSACTION_CATEGORY';
export const FINISH_EDIT_TRANSACTION_CATEGORY = 'FINISH_EDIT_TRANSACTION_CATEGORY';
export const DELETE_TRANSACTION_CATEGORY = 'DELETE_TRANSACTION_CATEGORY';

//FETCH
function requestCategories() {
    return {
        type: FETCH_TRANSACTION_CATEGORIES
    }    
}

function receiveCategories(result, data) {
    if (result == 'success') {
        return {
            type: FETCH_TRANSACTION_CATEGORIES,
            result,
            categories: data
        }
    }

    return {
        type: FETCH_TRANSACTION_CATEGORIES,
        result,
        errors: data
    }
}

export function fetchCategories(kind) {
    return dispatch => {
        dispatch(requestCategories());
        const api = createApi();

        return api.get(`categories/${kind.apiEndpoint}`)
            .then(response => response.data)
            .then((data) => {
                dispatch(receiveCategories('success', data));
            })
            .catch(({response}) => dispatch(receiveCategories('fail', response.data)));
    }
}

//SAVE
function requestSaveCategory() {
    return {
        type: SAVE_TRANSACTION_CATEGORY
    }
}

function receiveSaveCategory(result, data) {
    if (result === 'success') {
        return {
            type: SAVE_TRANSACTION_CATEGORY,
            result,
            category: data
        }
    }

    return {
        type: SAVE_TRANSACTION_CATEGORY,
        result,
        errors: data
    }
}

function create(name, kind) {
    return createApi().post(`categories/${kind.apiEndpoint}`, { name, kind });
}

function update(id, name, kind) {
    return createApi().put(`categories/${kind.apiEndpoint}${id}`, { name, kind });
}

export function saveCategory({id, name, kind}) {
    return dispatch => {
        dispatch(requestSaveCategory());

        const data = {
            name,
            kind: kind.id
        }

        const apiPromise = (id) ? update(id, name, kind) : create(name, kind);

        return apiPromise
            .then(response => response.data)
            .then(data => dispatch(receiveSaveCategory('success', data)))
            .catch(({response}) => dispatch(receiveSaveCategory('fail', response.data)));
    }
}

//EDIT
export function editCategory(id) {
    return {
        type: EDIT_TRANSACTION_CATEGORY,
        id
    }
}

export function finishEditCategory() {
    return {
        type: FINISH_EDIT_TRANSACTION_CATEGORY
    }
}

//DELETE
function requestDeleteCategory(id) {
    return {
        type: DELETE_TRANSACTION_CATEGORY,
        id
    }
}

function receiveDeleteCategory(id, result, errors) {
    if (result == 'success') {
        return {
            type: DELETE_TRANSACTION_CATEGORY,
            id,
            result
        }
    }

    return {
        type: DELETE_TRANSACTION_CATEGORY,
        result,
        errors
    }
}

export function deleteCategory(id, kind) {
    return dispatch => {
        dispatch(requestDeleteCategory(id));

        const api = createApi();
        api.delete(`categories/${kind.apiEndpoint}${id}`)
            .then(() => dispatch(receiveDeleteCategory(id, 'success')))
            .catch(({response}) => dispatch(receiveDeleteCategory(id, 'fail', response.data)))
    }
}