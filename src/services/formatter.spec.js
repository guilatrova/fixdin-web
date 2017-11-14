import { EXPENSE, INCOME } from '../transactions/kinds';
import moment from 'moment';
import {
    formatCurrency, 
    formatDate, 
    formatTransactionFilters,
    clean,
    formatTransactionReceived, 
    formatTransactionToSend,
    formatPeriodic
} from './formatter';

describe('services/formatter', () => {

    describe('formatDate()', () => {

        it('regular date', () => {
            const date = moment(new Date(2014, 7, 22)); //Month index starts in 0 (until 11)
            expect(formatDate(date)).to.equal('2014-08-22');
        });
        
        it('null date', () => {
            expect(formatDate()).to.be.null;
        });

    });

    describe('formatCurrency()', () => {
        
        it('simple currency', () => {
            expect(formatCurrency("R$ 10", INCOME)).to.be.equal(10);
        });
        
        it('with decimals', () => {
            expect(formatCurrency("R$ 19,99", INCOME)).to.be.equal(19.99);
        });
        
        it('to negative when kind is EXPENSE', () => {
            expect(formatCurrency("R$ 59,99", EXPENSE)).to.be.equal(-59.99);
        });
        
    });

    describe('formatTransaction...()', () => {

        describe('formatTransactionToSend()', () => {

            it('without periodic', () => {
                const dueDate = moment(new Date(2017, 0, 1));
                const transactionPreFormatted = {
                    id: 1,
                    due_date: dueDate,
                    payment_date: undefined,
                    value: "R$ 15,00",
                    priority: ""
                };
                const transactionPostFormatted = {
                    id: 1,
                    due_date: '2017-01-01',
                    payment_date: null,
                    value: -15,
                    periodic: undefined,
                    priority: undefined
                };

                expect(formatTransactionToSend(transactionPreFormatted, EXPENSE)).to.be.deep.equal(transactionPostFormatted);
            });

            it('with periodic and until defined', () => {
                const dueDate = moment(new Date(2017, 0, 1));
                const until = moment(new Date(2017, 0, 7));
                const transactionPreFormatted = {
                    id: 1,
                    due_date: dueDate,
                    payment_date: undefined,
                    value: "R$ 15,00",
                    priority: "",
                    periodic: {
                        frequency: 'daily',
                        how_many: "",
                        until,
                        interval: 1
                    }
                };
                const transactionPostFormatted = {
                    id: 1,
                    due_date: '2017-01-01',
                    payment_date: null,
                    value: -15,
                    priority: undefined,
                    periodic: {
                        frequency: 'daily',
                        until: '2017-01-07',
                        how_many: undefined,
                        interval: 1
                    }
                };

                expect(formatTransactionToSend(transactionPreFormatted, EXPENSE)).to.be.deep.equal(transactionPostFormatted);
            });

        });

        it('formatTransactionReceived()', () => {
            const transactionPreFormatted = {
                id: 1,
                due_date: '2014-07-01',
                payment_date: '2014-08-01',
                value: "-18",
            };
            const transactionPostFormatted = {
                id: 1,
                due_date: moment('2014-07-01', 'YYYY-MM-DD'),
                payment_date: moment('2014-08-01', 'YYYY-MM-DD'),
                value: -18,
            };

            expect(formatTransactionReceived(transactionPreFormatted, EXPENSE)).to.be.deep.equal(transactionPostFormatted);
        });

    });

    describe('formatPeriodic()', () => {

        it('null periodics should not be formatted', () => {
            expect(formatPeriodic(null)).to.be.equal(undefined);
        });

        it('when it have until should ignore how_many', () => {            
            const periodic = {
                how_many: 'how_many',
                until: moment(new Date(2017, 0, 1))
            };

            expect(formatPeriodic(periodic)).to.be.deep.equal({
                how_many: undefined,
                until: '2017-01-01'
            });
        });
    });

    xit('formatTransactionFilters', () => {

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