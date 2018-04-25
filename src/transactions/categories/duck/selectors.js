import commonSelectors from '../../../common/duck/selectors';

const getNameError = (state) => state.categories.errors.name;

const getErrors = (state) => state.categories.errors;

const isFetching = (state, type) => commonSelectors.isFetching(state.categories, type);

const getEditingCategory = (state) => state.categories.editingCategory;

const getCategories = (state) => state.categories.categories;

const getCategoriesNamesMappedById = (state) => getCategories(state).reduce((prev, category) => {
    prev[category.id] = category.name;
    return prev;
}, []);

export default {
    getNameError,
    getErrors,
    isFetching,
    getEditingCategory,
    getCategories,
    getCategoriesNamesMappedById
};