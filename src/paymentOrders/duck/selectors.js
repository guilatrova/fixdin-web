const fromStep1 = (state) => state.paymentOrders.step1;

const getStep1Checked = (state) => fromStep1(state).checked;
const getVisibleIncomes = (state) => fromStep1(state).visibleIncomes;
const getUntilDate = (state) => fromStep1(state).untilDate;
const getTotal = (state) => fromStep1(state).total;
const getValueToSave = (state) => fromStep1(state).toSave;
const getStep1TotalChecked = (state) => fromStep1(state).totalChecked;

const fromStep2 = (state) => state.paymentOrders.step2;

const getVisibleExpenses = (state) => fromStep2(state).visibleExpenses;
const getStep2Checked = (state) => fromStep2(state).checked;
const getStep2TotalChecked = (state) => fromStep2(state).totalChecked;
const getRemainingBalance = (state) => fromStep2(state).remainingBalance;
const getNextExpenses = (state) => fromStep2(state).nextExpenses;
const isFetching = (state) => fromStep2(state).isFetching;

const getExpectedBalanceAfterPayment = (state) => getRemainingBalance(state) + getValueToSave(state);

export default {
    step1: {
        getChecked: getStep1Checked,
        getVisibleIncomes,
        getUntilDate,
        getTotal,
        getValueToSave,
        getTotalChecked: getStep1TotalChecked
    },
    step2: {
        getChecked: getStep2Checked,
        getTotalChecked: getStep2TotalChecked,
        getVisibleExpenses,
        getRemainingBalance,
        getNextExpenses,
        isFetching
    },
    step3: {
        getExpectedBalanceAfterPayment
    }
};