const getCategoryNameById = (state) => (id, whenMissing = 'Carregando nome...') => {
    const found = state.categories.categories.find(category => category.id == id);

    if (found)
        return found.name;
    return whenMissing;
}

export default {
    getCategoryNameById
};