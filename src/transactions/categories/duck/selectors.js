const getNameError = (state) => state.categories.errors.name;

const isFetching = (state) => state.categories.isFetching;

const getCategories = (state) => state.categories.categories;

const getCategoriesNamesMappedById = (state) => getCategories(state).reduce((prev, category) => {
    prev[category.id] = category.name;
    return prev;
}, []);

export default {
    getNameError,
    isFetching,
    getCategories,
    getCategoriesNamesMappedById
};