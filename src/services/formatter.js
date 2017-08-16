import moment from 'moment';
import { EXPENSE } from './../transactions/kinds';

export function formatTransactionReceived(transaction) {
    return {
        ...transaction,
        due_date: moment(transaction.due_date, 'YYYY-MM-DD'),
        payment_date: transaction.payment_date ? moment(transaction.payment_date, 'YYYY-MM-DD') : undefined,
        value: Number(transaction.value)
    }
}

export function formatTransactionToSend(transaction, kind) {
    return {
        ...transaction,
        due_date: formatDate(transaction.due_date),
        payment_date: formatDate(transaction.payment_date),
        value: formatCurrency(transaction.value, kind),
        priority: transaction.priority ? transaction.priority : undefined,
    }
}

export function formatDate(date) {
    if (date)
        return date.format('YYYY-MM-DD');
    return null;
}

export function formatCurrency(value, kind) {
    if (isNaN(value)) {
        let unformattedAmount = value.toString().replace(/[^0-9|,|-]+/g, "");
        unformattedAmount = unformattedAmount.replace(",", ".");
        value = Number(unformattedAmount);
    }

    if (kind == EXPENSE && value > 0) {
        value = -value;
    }    

    return value;
}

export function formatCurrencyDisplay(value) {
    if (isNaN(value))
        value = Number(value);

    return `R$ ${value.toFixed(2).replace(".",",")}`;
}