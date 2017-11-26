const getLoginState = (state) => {
    return state.users.login;
};

const getSignupState = (state) => {
    return state.users.signup;
};

export default {
    getLoginState,
    getSignupState
};