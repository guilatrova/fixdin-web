import createApi from '../../services/api';

export const FETCH_TRANSACTION_CATEGORIES = 'FETCH_TRANSACTION_CATEGORIES';
export const SAVE_TRANSACTION_CATEGORY = 'SAVE_TRANSACTION_CATEGORY';

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

export function saveCategory(name, kind) {
    return dispatch => {
        dispatch(requestSaveCategory());

        const data = {
            name,
            kind: kind.id
        }

        const api = createApi();

        return api.post(`categories/${kind.apiEndpoint}`, data)
            .then(response => response.data)
            .then(data => dispatch(receiveSaveCategory('success', data)))
            .catch(({response}) => dispatch(receiveSaveCategory('fail', response.data)));
    }
}