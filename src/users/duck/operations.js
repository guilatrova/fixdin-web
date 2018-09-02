import actions from './actions';
import createApi from '../../services/api';
import { saveToken, saveUserName } from '../../services/session';
import handleError from '../../services/genericErrorHandler';
import { Operation } from './../../common/duck/operations';

class FetchTokenOperation extends Operation {
    constructor(loginData) {
        super(actions.requestToken, actions.receiveToken);
        this.loginData = loginData;

        return this.dispatch();
    }

    createApiService() {
        return createApi(false);
    }

    onSucceed(dispatch, receiveAction, data) {
        saveUserName(data.first_name, data.last_name);
        saveToken(data.token);
        return dispatch(receiveAction('success', data.token));
    }

    onFailed(dispatch, receiveAction, errors) {
        return dispatch(receiveAction('fail', handleError(errors)['detail']));
    }

    getApiPromise(api) {
        return api.post('auth/', this.loginData);
    }
}

class SignupOperation extends Operation {
    constructor(signupData) {
        super(actions.requestSignup, actions.receiveSignup);
        this.signupData = signupData;

        return this.dispatch();
    }

    createApiService() {
        return createApi(false);
    }

    getApiPromise(api) {
        return api.post('auth/users/', this.signupData);
    }
}

const fetchToken = (data) => new FetchTokenOperation(data);
const requestSignup = (data) => new SignupOperation(data);

export default {
    fetchToken,
    requestSignup
};
