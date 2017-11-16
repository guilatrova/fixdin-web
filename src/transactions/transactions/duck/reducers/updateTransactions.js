function updateTransaction(state, transaction) {
    const { transactions } = state;
    const updatedTransaction = transactions.find(item => item.id == transaction.id);
    
    if (updatedTransaction) {
        const index = transactions.indexOf(updatedTransaction);
        
        return {
            ...state,
            isFetching: false,
            transactions: [
                ...transactions.slice(0, index),
                transaction,
                ...transactions.slice(index + 1)
            ]
        };
    }

    return {
        ...state,
        isFetching: false,
        transactions: state.transactions.concat(transaction)
    };
}

export default function updateTransactions(state, transactions) {
    if (Array.isArray(transactions)) {
        let newState = state;

        for (let i = 0; i < transactions.length; i++) {
            newState = updateTransaction(newState, transactions[i]);
        }

        return newState;
    }
    
    return updateTransaction(state, transactions);
}