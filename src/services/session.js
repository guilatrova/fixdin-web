const TOKEN_KEY = 'token';

export function saveToken(value)
{
    localStorage.setItem(TOKEN_KEY, value);
}

export function getToken()
{
    return localStorage.getItem(TOKEN_KEY)
}

export function isAuthenticated() {
    return getToken() != null;
}