import { sort } from './sorts';

describe('sorts', () => {
    
    describe('alpha', () => {

        it('asc', () => {
            expect(sort('a', 'b', 'asc')).to.be.lessThan(0);
            expect(sort('b', 'a', 'asc')).to.be.greaterThan(0);
        });

        it('desc', () => {
            expect(sort('b', 'a', 'desc')).to.be.lessThan(0);
            expect(sort('a', 'b', 'desc')).to.be.greaterThan(0);
        });

        it('regardless of casing', () => {
            expect(sort('a', 'B', 'asc')).to.be.lessThan(0);
            expect(sort('A', 'b', 'asc')).to.be.lessThan(0);
        });

    });

    describe('numbers', () => {

        it('asc', () => {
            expect(sort(1, 2, 'asc')).to.be.lessThan(0);
            expect(sort(2, 1, 'asc')).to.be.greaterThan(0);
        });

        it('desc', () => {
            expect(sort(2, 1, 'desc')).to.be.lessThan(0);
            expect(sort(1, 2, 'desc')).to.be.greaterThan(0);
        });

        it('regardless of its type', () => {
            expect(sort('10', 9, 'asc')).to.be.greaterThan(0);
        });

    });

    describe('alphanumerics', () => {
        
        it('asc', () => {
            expect(sort('a', 1, 'asc')).to.be.greaterThan(0);
            expect(sort(1, 'a', 'asc')).to.be.lessThan(0);
        });

        it('desc', () => {
            expect(sort('a', 1, 'desc')).to.be.lessThan(0);
            expect(sort(1, 'a', 'desc')).to.be.greaterThan(0);
        });

    })

});