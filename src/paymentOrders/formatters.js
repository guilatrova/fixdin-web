import { formatTransactionReceived } from '../transactions/transactions/formatters';

// UM GRUPO DE TRANSAÇÃO TEM VÁRIAS DATAS
// UMA DATA TEM VÁRIAS TRANSAÇÕES
// GRUPO -> DATA -> TRANSAÇÕES

const reduceNextExpensesToTransactionsArray = (nextExpenses) =>
    nextExpenses.reduce((prev, group) => {
        const keys = Object.keys(group);
        for (let key of keys) {
            const formattedTransactions = group[key].map(transaction => formatTransactionReceived(transaction));
            prev = prev.concat(formattedTransactions);
        }
        return prev;
    }, []);

const reduceTransactionsGroupToIds = (transactionGroup) => {
    const cols = Object.keys(transactionGroup);
    const res = [];

    for (let col of cols) {
        for (let i = 0; i < transactionGroup[col].length; i++) {
            const transaction = transactionGroup[col][i];
            if (transaction) {
                res.push(transaction.id);
            }
        }
    }

    return res;
};

const getFirstField = (transactionGroup, field) => {
    try {
        const cols = Object.keys(transactionGroup);
        for (let col of cols) {
            for (let transaction of transactionGroup[col]) {
                if (transaction && (transaction[field] || transaction[field] == 0))
                    return transaction[field];
            }
        }
    }
    catch (error) {
        return `error: ${field}`;
    }

    return "not found";
};

export default {
    reduceNextExpensesToTransactionsArray,
    reduceTransactionsGroupToIds,
    getFirstField
};
