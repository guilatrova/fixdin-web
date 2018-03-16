import comparators from './comparators';
import moment from 'moment';

describe('transactions/duck/comparators', () => {
    
    const testComparator = (property, comparator, beforeValue, afterValue) => {
        it('when A comes before', () => {
            const a = { [property]: beforeValue };
            const b = { [property]: afterValue };

            expect(comparator(a, b)).toBeLessThan(0);
        });

        it('when A comers after', () => {
            const a = { [property]: afterValue };
            const b = { [property]: beforeValue };

            expect(comparator(a, b)).toBeGreaterThan(0);
        });

        it('when both are equal', () => {
            const a = { [property]: beforeValue };
            const b = { [property]: beforeValue };

            expect(comparator(a, b)).toBe(0);
        });
    };

    describe('compareByPriority', () => {

        testComparator('priority', comparators.compareByPriority, 5, 1);

    });

    describe('compareByDueDate', () => {        

        testComparator('due_date', comparators.compareByDueDate, moment(new Date(2017, 1, 1)), moment(new Date(2018, 1, 1)));

    });

    describe('compareByDeadline', () => {

        testComparator('deadline', comparators.compareByDeadline, 5, 20);

    });

    describe('compareByValue', () => {

        testComparator('value', comparators.compareByValue, 8.99, 10);

    });

    describe('expensesToBePaidCompare', () => {
        const createTransaction = (priority, due_date, deadline, value) => ({ priority, due_date, deadline, value });
        const compare = comparators.expensesToBePaidCompare;
        
        it('compares priority first', () => {
            const highPriority = createTransaction(5);
            const lessPriority = createTransaction(4);
            expect(compare(highPriority, lessPriority)).toBeLessThan(0);
        });

        it('compares due_date when same priority', () => {
            const soonerDueDate = createTransaction(5, moment(new Date(2017, 1, 1)));
            const laterDueDate = createTransaction(5, moment(new Date(2017, 1, 2)));
            expect(compare(soonerDueDate, laterDueDate)).toBeLessThan(0);
        });

        it('compares deadline when same due_date', () => {
            const date = moment(new Date(2017, 1, 1));
            const lessDeadline = createTransaction(5, date, 10);
            const highDeadline = createTransaction(5, date, 11);
            expect(compare(lessDeadline, highDeadline)).toBeLessThan(0);
        });

        it('compares value when same deadline', () => {
            const date = moment(new Date(2017, 1, 1));
            const lessDeadline = createTransaction(5, date, 10, 49);
            const highDeadline = createTransaction(5, date, 10, 50);
            expect(compare(lessDeadline, highDeadline)).toBeLessThan(0);
        });
    });

});