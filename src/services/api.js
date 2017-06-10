import axios from 'axios';
import { isAuthenticated, getToken } from './session';

export const BASE_URL = process.env.API_BASE_URL;//test heroku || 'http://localhost:8000/api/v1/';

export default function createAPI() {
    console.log('FROM HEROKU: ' + BASE_URL);
    console.log('OTHER TRY FROM SERVER.JS: ' + nodeStarterUrl)
    let auth = { }
    if (isAuthenticated()) {
        auth = {
            headers: {
                Authorization: `Token ${getToken()}`
            },
        }
    }

    return axios.create({
       baseURL: BASE_URL,
       ...auth
    });
};