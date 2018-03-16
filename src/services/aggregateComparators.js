const aggregateComparator = (comparators) => (a, b) => {
    let result;
    for (let comparator of comparators) {
        result = comparator(a, b);
        
        if (result !== 0) {
            break;
        }
    }

    return result;
};

export default aggregateComparator;