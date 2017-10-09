const compareByPriority = (a, b) => a.priority - b.priority;
const compareByDueDate = (a, b) => a.due_date.unix() - b.due_date.unix();
const compareByDeadline = (a, b) => b.deadline - a.deadline; //Smaller deadlines requires greater attention
const compareByValue = (a, b) => a.value - b.value;

export default {
    compareByPriority,
    compareByDueDate,
    compareByDeadline,
    compareByValue
}