import comparators from './comparators';

const getErrors = (state) => state.transactions.errors;

const getEditingTransaction = (state) => state.transactions.editingTransaction;

const isFetching = (state) => state.transactions.isFetching;

const getTransactionsToDisplay = (state) => {
    if (state.transactions.visibleTransactions) {
        return state.transactions.visibleTransactions;
    }
    return state.transactions.transactions
};

const getPendingIncomes = (state, until) => {
    let incomes = [];
        
    //incomes.sort(comparators);

    return incomes;
}

export default {
    getErrors,
    isFetching,
    getTransactionsToDisplay,
    getEditingTransaction,
    getPendingIncomes
};