import moment from 'moment';
import { EXPENSE } from '../../../shared/kinds';

const emptyTransaction = {
    due_date: moment(new Date()),
    description: '',
    category: undefined,
    value: 0,
    deadline: undefined,
    priority: 3,
    payment_date: undefined,
    details: '',
    periodic: undefined,
    kind: EXPENSE.id
};

export default emptyTransaction;
