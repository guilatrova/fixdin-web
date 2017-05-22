import createApi from '../services/api';
import { saveToken } from '../services/session';

export const AUTH_FETCH_TOKEN = 'AUTH_FETCH_TOKEN';

function requestToken(loginData) {
  return {
    type: AUTH_FETCH_TOKEN,
    loginData
  }
}

function receiveToken(result, data) {
  if (result === 'success') {
    return {
      type: AUTH_FETCH_TOKEN,
      result,
      token: data
    }
  }
  
  return {
    type: AUTH_FETCH_TOKEN,
    result,
    errors: data
  }
}

export function fetchToken(loginData) {
  return dispatch => {
    dispatch(requestToken(loginData));
    const api = createApi();

    return api.post('auth/', loginData)
      .then(response => response.data)
      .then(data => { 
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