import axios from 'axios';

export function doLogin(loginData) {
  return dispatch => {
    return axios.post('/api/auth', loginData);
  }
}