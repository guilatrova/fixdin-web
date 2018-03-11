import { ALL, EXPENSE, INCOME, getKind } from './kinds';

describe('getKind', () => {
    it('gets expense', () => {
        expect(getKind(0)).toEqual(EXPENSE);
    });
    
    it('gets income', () => {
        expect(getKind(1)).toEqual(INCOME);
    });
    
    it('gets undefined', () => {
        expect(getKind(ALL)).toBeFalsy();
    });
});