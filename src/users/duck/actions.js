import types from './types';

const requestToken = () => {
    return {
        type: FETCH_TOKEN
    }
}

const receiveToken = (result, data) => {
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

const requestSignup = () => {
    return {
        type: SIGNUP
    }
}

const receiveSignup = (result, data) => {
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

export default {
    requestToken,
    receiveToken,
    requestSignup,
    receiveSignup
}