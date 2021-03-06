import moment from 'moment';
import { EXPENSE, INCOME } from '../shared/kinds';
import { formatDate, clean } from '../../utils/formatters';

export function formatTransactionReceived(transaction) {
    return {
        ...transaction,
        due_date: moment(transaction.due_date, 'YYYY-MM-DD'),
        payment_date: transaction.payment_date ? moment(transaction.payment_date, 'YYYY-MM-DD') : undefined,
        value: Number(transaction.value)
    };
}

export function formatTransactionToSend(transaction) {
    return {
        ...transaction,
        kind: transaction.kind ? transaction.kind.id : undefined,
        due_date: formatDate(transaction.due_date),
        payment_date: formatDate(transaction.payment_date),
        value: formatCurrency(transaction.value, transaction.kind),
        periodic: formatPeriodic(transaction.periodic)
    };
}

export function formatPeriodic(periodic) {
    if (periodic && periodic.until) {
        return {
            ...periodic,
            how_many: undefined,
            until: formatDate(periodic.until)
        };
    }

    return periodic || undefined;
}

export function formatFilters(filters) {
    const formatted = {
        ...filters,
        kind: filters.kind ? filters.kind.value.id : undefined,
        category: filters.category ? filters.category.join() : undefined,
        account: filters.account ? filters.account.join() : undefined,
        due_date_from: formatDate(filters.due_date_from),
        due_date_until: formatDate(filters.due_date_until),
        payment_date_from: formatDate(filters.payment_date_from),
        payment_date_until: formatDate(filters.payment_date_until)
    };

    return clean(formatted);
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
    else if (kind == INCOME && value < 0) {
        value = -value;
    }

    return value;
}
