import moment from 'moment';

const today = moment().startOf('day');

const pending = transaction => !transaction.payment_date;

const overdue = transaction => pending(transaction) && today.isSameOrAfter(transaction.due_date);

export default {
    pending,
    overdue
};