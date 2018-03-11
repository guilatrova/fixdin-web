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

export default {
    reduceNextExpensesToTransactionsArray
};

