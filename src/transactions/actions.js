import createApi from '../services/api';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';

function getCurrencyValue(value) {
    let unformattedAmount = value.replace(/[^0-9|,|-]+/g, "");
    unformattedAmount = unformattedAmount.replace(",", ".");
    return Number(unformattedAmount);
}

function requestTransactions() {
    return {
        type: FETCH_TRANSACTIONS
    }
}

function receiveTransactions(result, data) {
    if (result === 'success') {
        return {
            type: FETCH_TRANSACTIONS,
            result,
            transactions: data
        }
    }

    return {
        type: FETCH_TRANSACTIONS,
        result,
        errors: data
    }
}

function requestCreateTransaction() {
    return {
        type: CREATE_TRANSACTION
    }
}

function receiveCreateTransaction(result, data) {
    if (result === 'success') {
        return {
            type: CREATE_TRANSACTION,
            result,
            transaction: data
        }
    }

    return {
        type: CREATE_TRANSACTION,
        result,
        errors: data
    }
}

export function createTransaction({ account, due_date, description, category, value, details }) {
    return dispatch => {
        dispatch(requestCreateTransaction());
        const api = createApi();
        
        due_date = due_date.format('YYYY-MM-DD');
        value = getCurrencyValue(value);
        
        const postData = {
            due_date,
            description,
            category: 1,        
            value,
            details,
            account: 1        
        }

        return api.post('incomes/', postData)
            .then(response => response.data)
            .then(data => dispatch(receiveCreateTransaction('success', data)))
            .catch(({response}) => dispatch(receiveCreateTransaction('fail', response.data)))
            
    }
}

export function fetchTransactions() {
    return dispatch => {
        dispatch(requestTransactions());
        const api = createApi();

        return api.get('incomes/')
            .then(response => response.data)
            .then(data => dispatch(receiveTransactions('success', data)))
            .catch(error => dispatch(receiveTransactions('fail', error.response)));
    }
}