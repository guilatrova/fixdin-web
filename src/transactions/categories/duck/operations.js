import actions from './actions';
import createApi from '../../../services/api';
import handleError from '../../../services/genericErrorHandler';
import createOperation, { Operation } from './../../../common/generic_duck/operations';

function fetchCategories(kind) {
    return dispatch => {
        dispatch(actions.requestCategories());
        const api = createApi();

        return api.get(`categories/${kind.apiEndpoint}`)
            .then(response => response.data)
            .then((data) => {
                dispatch(actions.receiveCategories('success', data, kind));
            })
            .catch(err => dispatch(actions.receiveCategories('fail', handleError(err))));
    }
}

function create(name, kind) {
    return createApi().post(`categories/${kind.apiEndpoint}`, { name, kind });
}

function update(id, name, kind) {
    return createApi().put(`categories/${kind.apiEndpoint}${id}`, { name, kind });
}

function saveCategory({id, name, kind}) {
    return dispatch => {
        dispatch(actions.requestSaveCategory());

        const data = {
            name,
            kind: kind.id
        }

        const apiPromise = (id) ? update(id, name, kind) : create(name, kind);

        return apiPromise
            .then(response => response.data)
            .then(data => dispatch(actions.receiveSaveCategory('success', data, kind)))
            .catch(err => dispatch(actions.receiveSaveCategory('fail', handleError(err))));
    }
}

function deleteCategory(id, kind) {
    return dispatch => {
        dispatch(actions.requestDeleteCategory(id));

        const api = createApi();
        return api.delete(`categories/${kind.apiEndpoint}${id}`)
            .then(() => dispatch(actions.receiveDeleteCategory(id, 'success')))
            .catch(err => dispatch(actions.receiveDeleteCategory(id, 'fail', handleError(err))))
    }
}

export default {
    fetchCategories,
    saveCategory,
    deleteCategory
};