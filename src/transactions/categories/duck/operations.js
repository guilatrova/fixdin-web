import actions from './actions';
import createApi from '../../../services/api';
import handleError from '../../../services/genericErrorHandler';
import createOperation, { Operation } from './../../../common/generic_duck/operations';

class FetchOperation extends Operation {
    constructor(kind) {
        super(actions.requestCategories, actions.receiveCategories);
        this.kind = kind;

        return this.dispatch();
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.kind));
    }

    getApiPromise(api) {
        return api.get(`categories/${this.kind.apiEndpoint}`);
    }
}

class SaveOperation extends Operation {
    constructor(id, name, kind) {
        super(actions.requestSaveCategory, actions.receiveSaveCategory);
        this.id = id;
        this.name = name;
        this.kind = kind;

        return this.dispatch();
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data, this.kind));
    }

    getApiPromise(api) {
        const { id, name, kind } = this;
        if (id)
            return api.put(`categories/${kind.apiEndpoint}${id}`, { name, kind });

        return api.post(`categories/${kind.apiEndpoint}`, { name, kind });
    }
}

class DeleteOperation extends Operation {
    constructor(id, kind) {
        super(actions.requestDeleteCategory, actions.receiveDeleteCategory);
        this.id = id;
        this.kind = kind;

        return this.dispatch();
    }

    onRequest(dispatch, requestAction) {
        dispatch(requestAction(this.id));
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction(this.id, 'success'));
    }

    onFailed(dispatch, receiveAction, errors) {
        dispatch(receiveAction(this.id, 'fail', handleError(errors)));
    }

    getApiPromise(api) {
        const { id, kind } = this;
        return api.delete(`categories/${kind.apiEndpoint}${id}`);
    }
}

const editCategory = actions.editCategory;
const finishEditCategory = actions.finishEditCategory;
const fetchCategories = (kind) => new FetchOperation(kind);
const saveCategory = ({id, name, kind}) => new SaveOperation(id, name, kind);
const deleteCategory = (id, kind) => new DeleteOperation(id, kind);

export default {
    fetchCategories,
    saveCategory,
    editCategory,
    finishEditCategory,
    deleteCategory
};