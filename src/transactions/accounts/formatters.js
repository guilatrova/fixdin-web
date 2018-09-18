const formatAccountReceived = (account) => ({
    ...account,
    start_balance: Number(account.start_balance)
});

export default {
    formatAccountReceived
};
