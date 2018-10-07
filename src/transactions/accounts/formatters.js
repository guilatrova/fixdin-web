const formatAccountReceived = (account) => ({
    ...account,
    start_balance: Number(account.start_balance)
});

const reduceTotalAccounts = (values) => (
    values.reduce((prev, values) => {
        prev.incomes += values.incomes;
        prev.expenses += values.expenses;
        prev.total += values.total;

        return prev;
    }, {
            incomes: 0,
            expenses: 0,
            total: 0
        })
);

export default {
    formatAccountReceived,
    reduceTotalAccounts
};
