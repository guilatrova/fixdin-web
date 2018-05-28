import actions from './actions';
import { Operation, DeleteOperation } from './../../../common/duck/operations';

class FetchOperation extends Operation {
    constructor() {
        super(actions.requestCategories, actions.receiveCategories);
    }

    onSucceed(dispatch, receiveAction, data) {
        dispatch(receiveAction('success', data));
    }

    getApiPromise(api) {
        return api.get(`categories/`);
    }
}

class SaveOperation extends Operation {
    constructor(id, name, kind) {
        super(actions.requestSaveCategory, actions.receiveSaveCategory);
        this.id = id;
        this.name = name;
        this.kind = kind.id;
    }

    onSucceed(dispatch, receiveAction, data) {
        return dispatch(receiveAction('success', data));
    }

    getApiPromise(api) {
        const { id, name, kind } = this;
        if (id)
            return api.put(`categories/${id}`, { name, kind });

        return api.post(`categories/`, { name, kind });
    }
}

class DeleteCategoryOperation extends DeleteOperation {
    constructor(id) {
        super(actions.requestDeleteCategory, actions.receiveDeleteCategory, id);
    }

    getEndpoint = (id) => `categories/${id}`;
}

const editCategory = actions.editCategory;
const finishEditCategory = actions.finishEditCategory;
const fetchCategories = () => new FetchOperation().dispatch();
const saveCategory = ({id, name, kind}) => new SaveOperation(id, name, kind).dispatch();
const deleteCategory = (id) => new DeleteCategoryOperation(id).dispatch();

export default {
    fetchCategories,
    saveCategory,
    editCategory,
    finishEditCategory,
    deleteCategory
};