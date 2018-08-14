import specifications from './specifications';

describe('paymentOrders/specifications', () => {

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

        it('false', () => {
            const group = {
                "2018-07-01": [
                    { id: 1, due_date: "2018-01-01" }
                ]
            };

            expect(specifications.isEverythingToDate(group)).toBeFalsy();
        });

    });
});
