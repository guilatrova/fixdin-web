import actions from './actions';
import { Operation, DeleteOperation } from './../../../common/duck/operations';

class FetchOperation extends Operation {
    constructor(kind) {
        super(actions.requestCategories, actions.receiveCategories);
        this.kind = kind;
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
    }

    onSucceed(dispatch, receiveAction, data) {
        return dispatch(receiveAction('success', data, this.kind));
    }

    getApiPromise(api) {
        const { id, name, kind } = this;
        if (id)
            return api.put(`categories/${kind.apiEndpoint}${id}`, { name, kind });

        return api.post(`categories/${kind.apiEndpoint}`, { name, kind });
    }
}

class DeleteCategoryOperation extends DeleteOperation {
    constructor(id, kind) {
        super(actions.requestDeleteCategory, actions.receiveDeleteCategory, id);
        this.kind = kind;
    }

    getEndpoint = (id) => `categories/${this.kind.apiEndpoint}${id}`;
}

const editCategory = actions.editCategory;
const finishEditCategory = actions.finishEditCategory;
const fetchAllCategories = () => { throw 'Not implemented yet'; };
const fetchCategories = (kind) => new FetchOperation(kind).dispatch();
const saveCategory = ({id, name, kind}) => new SaveOperation(id, name, kind).dispatch();
const deleteCategory = (id, kind) => new DeleteCategoryOperation(id, kind).dispatch();

export default {
    fetchCategories,
    fetchAllCategories,
    saveCategory,
    editCategory,
    finishEditCategory,
    deleteCategory
};