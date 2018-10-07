import selectors from './selectors';

describe('paymentOrders/duck/selectors', () => {

    describe('getCheckedByAccount', () => {
        const createExpense = (id, account, value) => ({ id, account, value });
        const createState = (props) => ({ paymentOrders: { ...props } });
        const nextExpenses = [
            { "2018-03-01": [createExpense(1, 1, 10), createExpense(2, 1, 20)], "2018-02-01": [createExpense(3, 2, 50)] },
            { "2018-03-01": [createExpense(4, 3, 40)], "2018-02-01": [] },
        ];

        it('returns values aggregated by account', () => {
            const checked = [1, 2, 3];

            const state = createState({ checked, nextExpenses });

            expect(selectors.getCheckedByAccount(state)).toEqual({ 1: 30, 2: 50 });
        });

        it('returns empty when nothing checked', () => {
            const checked = [];
            const state = createState({ checked, nextExpenses });

            expect(selectors.getCheckedByAccount(state)).toEqual({});
        });
    });

});
