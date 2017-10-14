const compareByPriority = (a, b) => a.priority - b.priority;
const compareByDueDate = (a, b) => a.due_date.unix() - b.due_date.unix();
const compareByDeadline = (a, b) => b.deadline - a.deadline; //Smaller deadlines requires greater attention
const compareByValue = (a, b) => a.value - b.value;

//TODO it's a too generic function. Need to be somewhere else
const aggregatedComparator = () => (a, b) => {
    let result;
    for (let idx in arguments) {
        let comparator = arguments[idx];
        result = comparator(a, b);
        
        if (result !== 0) {
            break;
        }
    }

    return result;
}

const expensesToBePaidCompare = (a, b) => 
    aggregatedComparator(compareByPriority, compareByDueDate, compareByDeadline, compareByValue);

export default {
    compareByPriority,
    compareByDueDate,
    compareByDeadline,
    compareByValue,
    expensesToBePaidCompare
}