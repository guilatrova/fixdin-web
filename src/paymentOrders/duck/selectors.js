const fromStep1 = (state) => state.paymentOrders.step1;

const getChecked = (state) => fromStep1(state).checked;

const getVisibleIncomes = (state) => fromStep1(state).visibleIncomes;

const getUntilDate = (state) => fromStep1(state).untilDate;

const getTotal = (state) => fromStep1(state).total;

const getValueToSave = (state) => fromStep1(state).toSave;

const getTotalChecked = (state) => fromStep1(state).totalChecked;

export default {
    step1: {
        getChecked,
        getVisibleIncomes,
        getUntilDate,
        getTotal,
        getValueToSave,
        getTotalChecked
    }
}