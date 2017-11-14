function getBalance(state) {
    return state.balances.balance;
}

function getRealBalance(state) {
    return state.balances.realBalance;
}

function getExpectedBalance(state) {
    return state.balances.expectedBalance;
}

export default {
    getBalance,
    getRealBalance,
    getExpectedBalance
};