const getErrors = (state) => state.transactions.errors;

const getTransactionsToDisplay = (state) => {
    if (state.transactions.visibleTransactions.length > 0) {
        return state.transactions.visibleTransactions;
    }
    return state.transactions.transactions
};

export default {
    getErrors,
    getTransactionsToDisplay
};