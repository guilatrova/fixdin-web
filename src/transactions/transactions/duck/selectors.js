const getErrors = (state) => state.transactions.errors;

const getEditingTransaction = (state) => state.transactions.editingTransaction;

const isFetching = (state) => state.transactions.isFetching;

const getTransactionsToDisplay = (state) => {
    if (state.transactions.visibleTransactions) {
        return state.transactions.visibleTransactions;
    }
    return state.transactions.transactions
};

export default {
    getErrors,
    isFetching,
    getTransactionsToDisplay,
    getEditingTransaction
};