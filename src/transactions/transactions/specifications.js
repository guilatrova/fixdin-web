import { PERIODIC_REASON } from './consts';

const isPeriodic = transaction => (transaction.bound_reason === PERIODIC_REASON);

export default {
    isPeriodic
};