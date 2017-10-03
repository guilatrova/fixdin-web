const getErrors = (state) => state.transactions.errors;

const getTransactionsToDisplay = (state) => {
    if (state.transactions.visibleTransactions.length > 0) {
        return state.transactions.visibleTransactions;
    }
    return state.transactions.transactions
};

const getEditingTransaction = (state) => state.transactions.editingTransaction;

export default {
    getErrors,
    getTransactionsToDisplay,
    getEditingTransaction
};