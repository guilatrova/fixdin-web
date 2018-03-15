const fromStep2 = (state) => state.paymentOrders;

const getStep2Checked = (state) => fromStep2(state).checked;
const getStep2TotalChecked = (state) => fromStep2(state).totalChecked;
const getRemainingBalance = (state) => fromStep2(state).remainingBalance;
const getNextExpenses = (state) => fromStep2(state).nextExpenses;
const isFetching = (state) => fromStep2(state).isFetching;

export default {
    step2: {
        getChecked: getStep2Checked,
        getTotalChecked: getStep2TotalChecked,
        getRemainingBalance,
        getNextExpenses,
        isFetching
    }
};