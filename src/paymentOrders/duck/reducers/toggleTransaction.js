export default function toggleTransaction(checked, ids, visibleTransactions, totalChecked) {
    const newChecked = [...checked];

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const currentIndex = checked.indexOf(id);

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    }

    const diffTotalChecked = visibleTransactions
        .filter(transaction => newChecked.includes(transaction.id))
        .map(transaction => transaction.value)
        .reduce((acc, cur) => acc + cur, 0) - totalChecked;

    totalChecked = diffTotalChecked + totalChecked;
    
    return {
        newChecked,
        diffTotalChecked,
        totalChecked
    };
}