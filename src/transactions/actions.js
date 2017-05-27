import createApi from '../services/api';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION';
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
export const FINISH_EDIT_TRANSACTION = 'FINISH_EDIT_TRANSACTION';

function getCurrencyValue(value) {
    let unformattedAmount = value.replace(/[^0-9|,|-]+/g, "");
    unformattedAmount = unformattedAmount.replace(",", ".");
    return Number(unformattedAmount);
}

//FETCH
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

//CREATE
function requestSaveTransaction() {
    return {
        type: SAVE_TRANSACTION
    }
}

function receiveSaveTransaction(result, data) {
    if (result === 'success') {
        return {
            type: SAVE_TRANSACTION,
            result,
            transaction: data
        }
    }

    return {
        type: SAVE_TRANSACTION,
        result,
        errors: data
    }
}

function update(id, data) {
    const api = createApi();
    return api.put('incomes/' + id, data);
}

function create(data) {
    const api = createApi();
    return api.post('incomes/', data);
}

export function saveTransaction({ id, account, due_date, description, category, value, details, importance, deadline }) {
    return dispatch => {
        dispatch(requestSaveTransaction());        
        
        due_date = due_date.format('YYYY-MM-DD');
        value = getCurrencyValue(value);
        
        const data = {
            due_date,
            description,
            category: 1,
            value,
            details,
            account: 1,
            importance,
            deadline
        }

        let apiPromise = (id) ? update(id, data) : create(data);
        
        apiPromise
            .then(response => response.data)
            .then(data => dispatch(receiveSaveTransaction('success', data)))
            .catch(({response}) => dispatch(receiveSaveTransaction('fail', response.data)))            
    }
}

export function fetchTransactions() {
    return dispatch => {
        dispatch(requestTransactions());
        const api = createApi();

        return api.get('incomes/')
            .then(response => response.data)
            .then(data => dispatch(receiveTransactions('success', data)))
            .catch(({response}) => dispatch(receiveTransactions('fail', response.data)));
    }
}