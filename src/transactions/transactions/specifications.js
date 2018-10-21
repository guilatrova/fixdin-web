import moment from 'moment';

import { PERIODIC_REASON, TRANSFER_REASON, STARTUP_ACCOUNT_DESCRIPTION } from './consts';

const isPeriodic = transaction => (transaction.bound_reason === PERIODIC_REASON);
const isTransfer = transaction => (transaction.bound_reason === TRANSFER_REASON);
const isStartupAccount = transaction => (transaction.description === STARTUP_ACCOUNT_DESCRIPTION);
const isOverdue = transaction => !transaction.payment_date && moment().isAfter(transaction.due_date);

export default {
    isPeriodic,
    isTransfer,
    isOverdue,
    isStartupAccount
};
