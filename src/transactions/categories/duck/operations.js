import actions from './actions';
import { Operation, createDeleteOperation } from './../../../common/genericDuck/operations';

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
        return dispatch(receiveAction('success', data, this.kind));
    }

    getApiPromise(api) {
        const { id, name, kind } = this;
        if (id)
            return api.put(`categories/${kind.apiEndpoint}${id}`, { name, kind });

        return api.post(`categories/${kind.apiEndpoint}`, { name, kind });
    }
}

const editCategory = actions.editCategory;
const finishEditCategory = actions.finishEditCategory;
const fetchCategories = (kind) => new FetchOperation(kind);
const fetchAllCategories = () => {
    throw 'Not implemented yet';
};

const saveCategory = ({id, name, kind}) => new SaveOperation(id, name, kind);
const deleteCategory = createDeleteOperation(
    actions.requestDeleteCategory, 
    actions.receiveDeleteCategory, 
    (id, extra) => `categories/${extra[0].apiEndpoint}${id}`
);

export default {
    fetchCategories,
    fetchAllCategories,
    saveCategory,
    editCategory,
    finishEditCategory,
    deleteCategory
};