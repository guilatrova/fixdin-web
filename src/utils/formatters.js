import moment from 'moment';

export function formatDate(date) {
    if (date) {
        if (moment.isMoment(date))
            return date.format('YYYY-MM-DD');

        return date;
    }
    
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

export function formatCurrencyDisplay(value, withMoneyMarker = true) {    
    if (!value || isNaN(value))
        return withMoneyMarker ? "R$ 0,00" : "0,00";

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
        
    if (withMoneyMarker)
        return formatter.format(value).replace('R$', 'R$ ');    
    return formatter.format(value).replace('R$', '');
}