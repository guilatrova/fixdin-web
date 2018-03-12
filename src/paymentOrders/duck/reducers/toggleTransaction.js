export default function toggleTransaction(initialTotalChecked, initialChecked, toggleCheck, transactions) {
    const newChecked = [...initialChecked];

    for (let id of toggleCheck) {
        const currentIndex = initialChecked.indexOf(id);

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    }

    let sumCheckedTransactions = transactions
        .filter(transaction => newChecked.includes(transaction.id))
        .map(transaction => transaction.value)
        .reduce((acc, cur) => acc + cur, 0);

    if (sumCheckedTransactions < 0) {
        sumCheckedTransactions = -sumCheckedTransactions;
    }

    const diffTotalChecked = sumCheckedTransactions - initialTotalChecked;

    const totalChecked = diffTotalChecked + initialTotalChecked;
    
    return {
        newChecked,
        diffTotalChecked,
        totalChecked
    };
}