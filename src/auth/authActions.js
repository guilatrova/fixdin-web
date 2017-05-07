import createApi from '../services/api';
import { saveToken } from '../services/session';

export function doLogin(loginData) {
  return dispatch => {
    const api = createApi();
    const loginPromise = api.post('auth/', loginData);
    
    loginPromise.then(
      ({ data }) => {
        saveToken(data.token);
      }
    );

    return loginPromise;
  }
}