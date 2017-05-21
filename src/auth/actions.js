import createApi from '../services/api';
import { saveToken } from '../services/session';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_TOKEN = 'RECEIVE_LOGIN';

function requestLogin(loginData) {
  return {
    type: REQUEST_LOGIN,
    loginData
  }
}

function receiveToken(result, data) {
  if (result === 'success') {
    return {
      type: RECEIVE_TOKEN,
      result,
      token: data
    }
  }
  
  return {
    type: RECEIVE_TOKEN,
    result,
    error: data
  }
}

export function doLogin(loginData) {
  return dispatch => {
    dispatch(requestLogin(loginData));
    const api = createApi();

    return api.post('auth/', loginData)
      .then(response => response.data)
      .then(data => { 
        console.log(data);
        saveToken(data.token);
        return data.token;
      })
      .then(token => dispatch(receiveToken('success', token)))
      .catch(error => dispatch(receiveToken('fail', error.response)))
  }
}

export function sendSignupRequest(signupData) {
  return dispatch => {
    const api = createApi();
    return api.post('auth/users/', signupData);
  }
}