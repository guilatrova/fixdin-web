import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import axios from 'axios'
import moment from 'moment';

import { EXPENSE, INCOME } from './../../src/transactions/kinds';
import {
    formatCurrency, 
    formatDate, 
    formatTransactionReceived, 
    formatTransactionToSend
} from './../../src/services/formatter';

describe('Transaction Formatter', () => {

    it('formats date', () => {
        const date = moment(new Date(2014, 7, 22)); //Month index starts in 0 (until 11)
        expect(formatDate(date)).to.equal('2014-08-22');
    });

    it('formats null date', () => {
        expect(formatDate()).to.be.null;
    });

    it('formats simple currency', () => {
        expect(formatCurrency("R$ 10", INCOME)).to.be.equal(10);
    });

    it('formats currency with decimals', () => {
        expect(formatCurrency("R$ 19,99", INCOME)).to.be.equal(19.99);
    });

    it('formats currency to negative when kind is EXPENSE', () => {
        expect(formatCurrency("R$ 59,99", EXPENSE)).to.be.equal(-59.99);
    });

    describe('formats transactions', () => {

        describe('before sending it to API', () => {

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
                }

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
                        period: 'daily',
                        how_many: "",
                        until,
                        distance: 1
                    }
                };
                const transactionPostFormatted = {
                    id: 1,
                    due_date: '2017-01-01',
                    payment_date: null,
                    value: -15,
                    priority: undefined,
                    periodic: {
                        period: 'daily',
                        until: '2017-01-07',
                        how_many: undefined,
                        distance: 1
                    }
                }

                expect(formatTransactionToSend(transactionPreFormatted, EXPENSE)).to.be.deep.equal(transactionPostFormatted);
            });

        });

        it('when receives from API', () => {
            const dueDate = moment(new Date(2017, 0, 1));
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
            }

            expect(formatTransactionReceived(transactionPreFormatted, EXPENSE)).to.be.deep.equal(transactionPostFormatted);
        });

    });

});