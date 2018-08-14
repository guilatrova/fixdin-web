import transactionSpecifications from '../transactions/transactions/specifications';

const hasAnyTransaction = (group, periodKey) => {
    console.log(`${periodKey} has ${group[periodKey].length} items`);
    return group[periodKey].length > 0;
};

const isEverythingToDate = (transactionGroup) =>
    Object.keys(transactionGroup)
        .filter(periodKey => hasAnyTransaction(transactionGroup, periodKey))
        .every(periodKey => transactionGroup[periodKey].every(
            t => {
                console.log("here");
                return !transactionSpecifications.isOverdue(t);
            }
        ));

const isAnythingPending = (transactionGroup) =>
    Object.keys(transactionGroup)
        .filter(periodKey => hasAnyTransaction(transactionGroup, periodKey))
        .every(periodKey => transactionGroup[periodKey].some(
            t => transactionSpecifications.isOverdue(t))
        );

export default {
    isEverythingToDate,
    isAnythingPending
};
