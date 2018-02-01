import { PERIODIC_REASON, TRANSFER_REASON } from './consts';

const isPeriodic = transaction => (transaction.bound_reason === PERIODIC_REASON);
const isTransfer = transaction => (transaction.bound_reason === TRANSFER_REASON);

export default {
    isPeriodic,
    isTransfer
};