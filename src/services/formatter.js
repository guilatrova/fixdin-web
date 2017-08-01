import moment from 'moment';

export function formatTransaction(transaction) {
    return {
        ...transaction,
        due_date: moment(transaction.due_date, 'YYYY-MM-DD'),
        payment_date: transaction.payment_date ? moment(transaction.payment_date, 'YYYY-MM-DD') : undefined,
        value: Number(transaction.value)
    }
}

export function formatDate(date) {
    if (date)
        return date.format('YYYY-MM-DD');
}

export function formatCurrency(value) {
    let unformattedAmount = value.replace(/[^0-9|,|-]+/g, "");
    unformattedAmount = unformattedAmount.replace(",", ".");
    return Number(unformattedAmount);
}