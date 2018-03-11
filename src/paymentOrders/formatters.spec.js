import moment from 'moment';
import formatters from './formatters';

describe('paymentOrders/formatters', () => {
    it('reduceNextExpensesToTransactionsArray', () => {
        const due_date = moment();
        const createExpense = (id, value) => ({ id, value, due_date, payment_date: undefined });
        const nextExpenses = [
            { "2018-03-01": [ createExpense(1, "-100"), createExpense(2, "-200") ], "2018-02-01": [ createExpense(3, "-300") ] },
            { "2018-03-01": [ createExpense(4, "-400") ], "2018-02-01": [] },
        ];

        expect(
            formatters.reduceNextExpensesToTransactionsArray(nextExpenses)
        ).toEqual([
            createExpense(1, -100), createExpense(2, -200), createExpense(3, -300), createExpense(4, -400)
        ]);
    });
});