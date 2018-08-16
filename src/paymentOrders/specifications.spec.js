import specifications from './specifications';
import moment from 'moment';

describe('paymentOrders/specifications', () => {

    const tomorrow = moment({ hour: 0 }).add(1, 'day');

    describe('isEverythingToDate', () => {

        it('late payment', () => {
            const group =
            {
                "2018-07-01": [
                    { id: 1, due_date: "2018-07-01", payment_date: "2018-07-20" }
                ]
            };

            expect(specifications.isEverythingToDate(group)).toBeTruthy();
        });

        it('still pending', () => {
            const group = {
                "2018-07-01": [
                    { id: 1, due_date: "2018-07-01" }
                ]
            };

            expect(specifications.isEverythingToDate(group)).toBeFalsy();
        });

        it('within deadline', () => {
            const group = {
                "2018-07-01": [
                    { id: 1, due_date: tomorrow }
                ]
            };

            expect(specifications.isEverythingToDate(group)).toBeTruthy();
        });

        it('but one pending', () => {

            const group = {
                "2018-07-01": [
                    { id: 1, due_date: tomorrow },
                    { id: 2, due_date: tomorrow },
                    { id: 3, due_date: tomorrow },
                    { id: 4, due_date: "2018-01-01" },
                ]
            };

            expect(specifications.isEverythingToDate(group)).toBeFalsy();
        });

        it('all payed', () => {

            const group = {
                "2018-07-01": [
                    { id: 1, due_date: "2018-01-01", payment_date: tomorrow },
                    { id: 2, due_date: "2018-01-01", payment_date: "2018-07-01" },
                    { id: 3, due_date: "2018-01-01", payment_date: "2018-01-01" },
                    { id: 4, due_date: "2018-01-01", payment_date: "2018-01-01" },
                ]
            };

            expect(specifications.isEverythingToDate(group)).toBeTruthy();
        });

        it('all payed or within deadline', () => {

            const group = {
                "2018-07-01": [
                    { id: 1, due_date: "2018-01-01", payment_date: tomorrow },
                    { id: 2, due_date: "2018-01-01", payment_date: "2018-07-01" },
                    { id: 3, due_date: "2018-01-01", payment_date: "2018-01-01" },
                    { id: 4, due_date: tomorrow },
                ]
            };

            expect(specifications.isEverythingToDate(group)).toBeTruthy();
        });

    });

});
