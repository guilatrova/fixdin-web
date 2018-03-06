import moment from 'moment';
import {
    formatDate, 
    clean,
    formatCurrencyDisplay
} from './formatters';

describe('utils/formatter', () => {

    describe('formatDate()', () => {

        it('regular date', () => {
            const date = moment(new Date(2014, 7, 22)); //Month index starts in 0 (until 11)
            expect(formatDate(date)).to.equal('2014-08-22');
        });
        
        it('null date', () => {
            expect(formatDate()).to.be.null;
        });

    });

    xdescribe('formatCurrencyDisplay()', () => {
        it('returns R$ 0,00 by default', () => {
            expect(formatCurrencyDisplay()).toEqual("R$ 0,00");
        });

        it('returns R$ 0,00 ', () => {
            expect(formatCurrencyDisplay()).toEqual("R$ 0,00");
        });

        it('returns correct number to display', () => {
            expect(formatCurrencyDisplay(45.32)).toEqual("R$ 45,32");
        });
    });

    it('clean', () => {
        const obj = {
            numberOk: 1,
            stringOk: 'a',
            emptyStrOk: '',
            nullRemoved: null,
            undefinedRemoved: undefined
        };

        expect(clean(obj)).to.deep.equal({
            numberOk: 1,
            stringOk: 'a',
            emptyStrOk: ''
        });
    });

});