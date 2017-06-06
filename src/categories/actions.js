import createApi from '../services/api';

export const SAVE_TRANSACTION_CATEGORY = 'SAVE_TRANSACTION_CATEGORY';

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