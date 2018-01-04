const getCacheFromId = (state, id) => {
    return state.app.cache.find(cache => cache.id == id);
};

export default {
    getCacheFromId
};