export function formatDate(date) {
    if (date)
        return date.format('YYYY-MM-DD');
}

export function formatCurrency(value) {
    let unformattedAmount = value.replace(/[^0-9|,|-]+/g, "");
    unformattedAmount = unformattedAmount.replace(",", ".");
    return Number(unformattedAmount);
}