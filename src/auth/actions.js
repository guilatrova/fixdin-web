import createApi from '../services/api';
import { saveToken } from '../services/session';

export const FETCH_TOKEN = 'AUTH_FETCH_TOKEN';
export const SIGNUP = 'AUTH_REQUEST_SIGNUP';

//LOGIN
function requestToken() {
  return {
    type: FETCH_TOKEN
  }
}

function receiveToken(result, data) {
  if (result === 'success') {
    return {
      type: FETCH_TOKEN,
      result,
      token: data
    }
  }
  
  return {
    type: FETCH_TOKEN,
    result,
    error: data
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
      .catch(({response}) => dispatch(receiveToken('fail', response.data['detail'])));
  }
}

//SIGNUP
function requestSignup() {
  return {
    type: SIGNUP
  }
}

function receiveSignup(result, data) {
  if (result === 'success') {
    return {
      type: SIGNUP,
      result,
      user: data
    }
  }
  
  return {
    type: SIGNUP,
    result,
    errors: data
  }
}

export function fetchSignup(signupData) {
  return dispatch  => {
    dispatch(requestSignup())
    const api = createApi();

    return api.post('auth/users/', signupData)
      .then(response => response.data)
      .then(data => dispatch(receiveSignup('success', data)))
      .catch(({response}) => dispatch(receiveSignup('fail', response.data)));        
  }
}