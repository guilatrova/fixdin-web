import createApi from '../services/api';

function getCurrencyValue(value) {
    let unformattedAmount = value.replace(/[^0-9|,|-]+/g, "");
    unformattedAmount = unformattedAmount.replace(",", ".");
    console.log(unformattedAmount);
    return Number(unformattedAmount);
}

export function sendTransactionRequest({ account, due_date, description, category, value, details }) {
    const api = createApi();
    
    due_date = due_date.format('YYYY-MM-DD');
    value = getCurrencyValue(value);
    
    const postData = {
        due_date: due_date,
        description: description,
        category: 1,        
        value: value,
        details: details,
        account: 1        
    }

    return api.post('incomes/', postData);
}

export function getTransactions() {
    const api = createApi();

    return api.get('incomes/');
}