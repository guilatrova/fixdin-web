import types from './types';

const requestToken = () => {
    return {
        type: types.FETCH_TOKEN
    }
}

const receiveToken = (result, data) => {
    if (result === 'success') {
        return {
            type: types.FETCH_TOKEN,
            result,
            token: data
        }
    }
    
    return {
        type: types.FETCH_TOKEN,
        result,
        error: data
    }
}

const requestSignup = () => {
    return {
        type: types.SIGNUP
    }
}

const receiveSignup = (result, data) => {
    if (result === 'success') {
        return {
            type: types.SIGNUP,
            result,
            user: data
        }
    }
    
    return {
        type: types.SIGNUP,
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