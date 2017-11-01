import actions from './actions';
import types from './types';
import { Operation } from './../../../common/genericDuck/operations';

class BaseSettingsOperation extends Operation {
    constructor(requestAction, type) {
        super(requestAction, actions.receiveSettings);
        this.type = type;
    }

    onSucceed(dispatch, receiveAction, data) {
        return dispatch(receiveAction(this.type, 'success', data));
    }

    onFailed(dispatch, receiveAction, errors) {
        return dispatch(receiveAction(this.type, 'fail', data));
    }
}

class FetchSettingsOperation extends BaseSettingsOperation {
    constructor() {
        super(actions.requestSettings, types.FETCH_SETTINGS);

        return this.dispatch();
    }

    getApiPromise(api) {
        return api.get(`integrations/cpfl/`);
    }
}

class UpdateSettingsOperation extends BaseSettingsOperation {
    constructor(data) {
        super(actions.updateSettings, types.UPDATE_SETTINGS);
        this.data = data;

        return this.dispatch();
    }

    getApiPromise(api) {
        return api.put(`integrations/cpfl/`, this.data);
    }
}

class RunServiceOperation extends Operation {
    constructor() {
        super(actions.requestRunService, actions.receiveServiceResult);

        return this.dispatch();
    }

    getApiPromise(api) {
        return api.post(`integrations/cpfl/`);
    }
}

const fetchSettings = () => new FetchSettingsOperation();
const updateSettings = (settings) => new UpdateSettingsOperation(settings);
const runService = () => new RunServiceOperation();

export default {
    fetchSettings,
    updateSettings,
    runService
};