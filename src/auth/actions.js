import createApi from '../services/api';
import { saveToken } from '../services/session';

export const AUTH_FETCH_TOKEN = 'AUTH_FETCH_TOKEN';
export const AUTH_REQUEST_SIGNUP = 'AUTH_REQUEST_SIGNUP';

function requestToken() {
  return {
    type: AUTH_FETCH_TOKEN
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
    error: data
  }
}

function requestSignup() {
  return {
    type: AUTH_REQUEST_SIGNUP
  }
}

function receiveSignup(result, data) {
  if (result === 'success') {
    return {
      type: AUTH_REQUEST_SIGNUP,
      result,
      user: data
    }
  }
  
  return {
    type: AUTH_REQUEST_SIGNUP,
    result,
    errors: data
  }
}

export function fetchToken(loginData) {
  return dispatch => {
    dispatch(requestToken());
    const api = createApi();

    return api.post('auth/', loginData)
      .then(response => response.data)
      .then(data => data.token)
      .then(token => {
        saveToken(token);
        dispatch(receiveToken('success', token));
      })
      .catch(error => {
        console.log(error);
        dispatch(receiveToken('fail', error.response.data['detail']));
      });
  }
}

export function fetchSignup(signupData) {
  return dispatch  => {
    dispatch(requestSignup())
    const api = createApi();

    return api.post('auth/users/', signupData)
      .then(response => response.data)
      .then(data => 
        dispatch(receiveSignup('success', data)))
      .catch(error => 
        dispatch(receiveSignup('fail', error.response))
      );
  }
}