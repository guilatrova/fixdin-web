export const TOKEN_KEY = 'token';
export const NAME_KEY = 'username';

export const saveUserName = (first, last) =>
    localStorage.setItem(NAME_KEY, `${first} ${last}`);

export const getUserName = () => localStorage.getItem(NAME_KEY);

export const saveToken = (value) => localStorage.setItem(TOKEN_KEY, value);

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = () => getToken() != null;
