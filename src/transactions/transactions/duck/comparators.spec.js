import comparators from './comparators';

describe('transactions/duck/comparators', () => {
    
    const testComparator = (property, comparator, lesserValue, greaterValue) => {
        it('when A is lesser', () => {
            const a = { [property]: lesserValue };
            const b = { [property]: greaterValue };

            expect(comparator(a, b)).to.be.lessThan(0);
        });

        it('when A is greater', () => {
            const a = { [property]: greaterValue };
            const b = { [property]: lesserValue };

            expect(comparator(a, b)).to.be.greaterThan(0);
        });

        it('when both are equal', () => {
            const a = { [property]: lesserValue };
            const b = { [property]: lesserValue };

            expect(comparator(a, b)).to.equal(0);
        });
    }

    describe('compareByPriority', () => {

        testComparator('priority', comparators.compareByPriority, 1, 5);

    });

    describe('compareByDueDate', () => {        

        testComparator('due_date', comparators.compareByDueDate, moment(new Date(2017, 1, 1)), moment(new Date(2018, 1, 1)));

    });

    describe('compareByDeadline', () => {

        testComparator('deadline', comparators.compareByDeadline, 20, 5);

    });

    describe('compareByValue', () => {

        testComparator('value', comparators.compareByValue, 8.99, 10);

    });

    it('expensesToBePaid');

});