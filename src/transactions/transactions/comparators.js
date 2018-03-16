const compareByPriority = (a, b) => b.priority - a.priority;
const compareByDueDate = (a, b) => a.due_date.unix() - b.due_date.unix();
const compareByDeadline = (a, b) => a.deadline - b.deadline; //Smaller deadlines requires greater attention
const compareByValue = (a, b) => a.value - b.value;

//TODO: it's a too generic function. Need to be somewhere else
const aggregatedComparator = (comparators) => (a, b) => {
    let result;
    for (let comparator of comparators) {
        result = comparator(a, b);
        
        if (result !== 0) {
            break;
        }
    }

    return result;
};

const expensesToBePaidCompare = (a, b) => 
    aggregatedComparator([compareByPriority, compareByDueDate, compareByDeadline, compareByValue])(a, b);

export default {
    compareByPriority,
    compareByDueDate,
    compareByDeadline,
    compareByValue,
    expensesToBePaidCompare
};