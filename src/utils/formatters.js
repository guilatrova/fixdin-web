export function formatDate(date) {
    if (date)
        return date.format('YYYY-MM-DD');
    return null;
}

export function clean(obj) {
    for (let propName in obj) { 
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}

export function formatCurrencyDisplay(value) {    
    if (!value || isNaN(value))
        return "R$ 0,00";

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
        
    return formatter.format(value).replace('R$', 'R$ ');
}