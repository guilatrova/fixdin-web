const fromStep1 = (state) => state.paymentOrders.step1;

const getStep1Checked = (state) => fromStep1(state).checked;
const getVisibleIncomes = (state) => fromStep1(state).visibleIncomes;
const getUntilDate = (state) => fromStep1(state).untilDate;
const getTotal = (state) => fromStep1(state).total;
const getValueToSave = (state) => fromStep1(state).toSave;
const getTotalChecked = (state) => fromStep1(state).totalChecked;

const fromStep2 = (state) => state.paymentOrders.step2;

const getVisibleExpenses = (state) => fromStep2(state).visibleExpenses;
const getStep2Checked = (state) => fromStep2(state).checked;
const getRemainingBalance = (state) => fromStep2(state).remainingBalance;

export default {
    step1: {
        getChecked: getStep1Checked,
        getVisibleIncomes,
        getUntilDate,
        getTotal,
        getValueToSave,
        getTotalChecked
    },
    step2: {
        getChecked: getStep2Checked,
        getVisibleExpenses,
        getRemainingBalance
    }
}