import moment from 'moment';

const isNumeric = (x) => !isNaN(x);

const anyNumeric = (a, b) => isNumeric(a) || isNumeric(b);

export const sortNumeric = (a, b, order) => {
    if(isNumeric(a) && isNumeric(b)) {
        if (order === 'asc')
            return a - b;
        return b - a;
    }
    
    if (isNumeric(a)) {
        return (order === 'asc' ? -1 : 1);
    }
    
    if (isNumeric(b)) {
        return (order === 'asc' ? 1 : -1);
    }    
};

const anyMoment = (a, b) => moment.isMoment(a) || moment.isMoment(b);

export const sortMoment = (a, b, order) => {
    if (moment.isMoment(a) && moment.isMoment(b)) { 
        if (order === 'desc') 
            return b.unix() - a.unix(); 
        else 
            return a.unix() - b.unix(); 
    } 

    if (moment.isMoment(a)) { 
        return (order === 'desc') ? 1 : -1; 
    } 

    if (moment.isMoment(b)) { 
        return (order === 'desc') ? -1 : 1; 
    } 

    return 0; 
};

const sortString = (a, b, order) => {
    a = a.toUpperCase();
    b = b.toUpperCase();

    if (order === 'desc')
        return (b > a) ? 1 : -1;
    
    return (a > b) ? 1 : -1;
};

export const sort = (a, b, order) => {
    if (anyMoment(a, b))
        return sortMoment(a, b, order);

    if (anyNumeric(a, b))
        return sortNumeric(a, b, order);

    return sortString(a, b, order);
};