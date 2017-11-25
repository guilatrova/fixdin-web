import axios from 'axios';
import { isAuthenticated, getToken } from './session';

export const BASE_URL = process.env.API_BASE_URL;

export default function createAPI(addAuthentication = true) {
    let auth = { };
    if (addAuthentication && isAuthenticated()) {
        auth = {
            headers: {
                Authorization: `Token ${getToken()}`
            },
        };
    }

    return axios.create({
       baseURL: BASE_URL,
       ...auth
    });
}