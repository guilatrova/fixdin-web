import createApi from '../services/api';
import { saveToken } from '../services/session';

export function sendLoginRequest(loginData) {
  return dispatch => {
    const api = createApi();
    const loginPromise = api.post('auth/', loginData);
    
    loginPromise.then(
      ({ data }) => {
        saveToken(data.token);
      }
    )
    .catch(
      (error) => {
        console.error(error);
      }
    );

    return loginPromise;
  }
}

export function sendSignupRequest(signupData) {
  return dispatch => {
    const api = createApi();
    return api.post('auth/users/', signupData);
  }
}