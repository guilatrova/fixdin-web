const getSettings = (state) => state.integrations.settings;
const getErrors = (state) => state.integrations.errors;
const isFetching = (state) => state.integrations.isFetching;
const getHistoric = (state) => state.integrations.historic;

const getLastHistory = (state) => getHistoric(state).slice(-1)[0];

export default {
    getSettings,
    getErrors,
    isFetching,
    getHistoric,
    getLastHistory
};