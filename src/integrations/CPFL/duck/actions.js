import types from './types';

function requestSettings() {
    return {
        type: types.FETCH_SETTINGS
    }
}

function updateSettings() {
    return {
        type: types.UPDATE_SETTINGS
    }    
}

function receiveSettings(type, result, data) {
    if (result === 'success') {
        return {
            type,
            result,
            settings: data
        }
    }

    return {
        type,
        result,
        errors: data
    }
}

function requestRunService() {
    return {
        type: types.RUN_SERVICE
    }
}

function receiveServiceResult(result, data) {
    if (result == 'success') {
        return {
            type: types.RUN_SERVICE,
            result,
            history: data
        }
    }

    return {
        type: types.RUN_SERVICE,
        result,
        errors: data
    }
}

export default {
    requestSettings,
    updateSettings,
    receiveSettings,

    requestRunService,
    receiveServiceResult
}