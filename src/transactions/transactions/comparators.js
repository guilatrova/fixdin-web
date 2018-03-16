import aggregate from '../../services/aggregateComparators';

const compareByPriority = (a, b) => b.priority - a.priority;
const compareByDueDate = (a, b) => a.due_date.unix() - b.due_date.unix();
const compareByDeadline = (a, b) => a.deadline - b.deadline; //Smaller deadlines requires greater attention
const compareByValue = (a, b) => a.value - b.value;

const expensesToBePaidCompare = 
    aggregate([compareByPriority, compareByDueDate, compareByDeadline, compareByValue]);

export default {
    compareByPriority,
    compareByDueDate,
    compareByDeadline,
    compareByValue,
    expensesToBePaidCompare
};