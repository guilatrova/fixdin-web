const isFetching = (collection, type) => type ? 
    collection.fetching.includes(type) : collection.fetching.length > 0;

export default {
    isFetching
};