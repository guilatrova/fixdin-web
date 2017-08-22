function getBalance(state) {
    return state.balances.balance;
}

function getRealBalance(state) {
    return state.balances.realBalance;
}

export default {
    getBalance,
    getRealBalance
};