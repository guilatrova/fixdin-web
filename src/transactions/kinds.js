export const EXPENSE = {
    id: 0,
    text: 'despesa',
    apiEndpoint: 'expenses/',    
}

export const INCOME = {
    id: 1,
    text: 'receita',
    apiEndpoint: 'incomes/'
}

export const ALL = {
    text: 'movimentações',
    apiEndpoint: 'transactions/'
}

export function getKind(id) {
    switch(id) {
        case 0:
            return EXPENSE;

        case 1:
            return INCOME;

        default:
            return {};
    }
}